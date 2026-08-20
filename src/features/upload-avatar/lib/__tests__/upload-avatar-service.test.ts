import { describe, it, expect, vi, beforeEach } from 'vitest'
import { uploadAvatar } from '../upload-avatar-service'
import { prisma } from '@/shared/lib/prisma'
import { ForbiddenError } from '@/shared/lib/server'

vi.mock('@/shared/lib/prisma', () => ({
  prisma: {
    user: {
      update: vi.fn(),
    },
  },
}))

describe('Upload Avatar Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const validInput = {
    userId: 'user-123',
    image: 'https://cdn.example.com/avatars/new-avatar.jpg',
  }

  it('uploads avatar successfully', async () => {
    vi.mocked(prisma.user.update).mockResolvedValue({} as any)

    await uploadAvatar(validInput, 'user-123')

    expect(prisma.user.update).toHaveBeenCalled()
  })

  it('throws ForbiddenError when user tries to update another user avatar', async () => {
    await expect(
      uploadAvatar(validInput, 'different-user-id')
    ).rejects.toThrow(ForbiddenError)
  })

  it('only allows user to update their own avatar', async () => {
    await expect(
      uploadAvatar(validInput, 'wrong-user')
    ).rejects.toThrow('You can only update your own avatar')
  })

  it('calls prisma.user.update with correct userId', async () => {
    vi.mocked(prisma.user.update).mockResolvedValue({} as any)

    await uploadAvatar(validInput, 'user-123')

    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'user-123' },
      })
    )
  })

  it('calls prisma.user.update with new image', async () => {
    vi.mocked(prisma.user.update).mockResolvedValue({} as any)

    await uploadAvatar(validInput, 'user-123')

    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { imageUrl: validInput.image },
      })
    )
  })

  it('validates input with server schema', async () => {
    const invalidInput = {
      userId: '',
      image: 'https://example.com/avatar.jpg',
    }

    await expect(
      uploadAvatar(invalidInput, 'user-123')
    ).rejects.toThrow()
  })

  it('rejects invalid image URL', async () => {
    const invalidInput = {
      userId: 'user-123',
      image: '',
    }

    await expect(
      uploadAvatar(invalidInput, 'user-123')
    ).rejects.toThrow()
  })

  it('handles database connection errors', async () => {
    const dbError = new Error('Connection timeout')
    vi.mocked(prisma.user.update).mockRejectedValue(dbError)

    await expect(
      uploadAvatar(validInput, 'user-123')
    ).rejects.toThrow('Connection timeout')
  })

  it('logs and rethrows Prisma errors', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const prismaError = new Error('Database error')

    vi.mocked(prisma.user.update).mockRejectedValue(prismaError)

    await expect(
      uploadAvatar(validInput, 'user-123')
    ).rejects.toThrow('Database error')

    expect(consoleErrorSpy).toHaveBeenCalledWith('Prisma Error in uploadAvatar:', prismaError)
    consoleErrorSpy.mockRestore()
  })

  it('updates imageUrl field', async () => {
    vi.mocked(prisma.user.update).mockResolvedValue({} as any)

    await uploadAvatar(validInput, 'user-123')

    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { imageUrl: expect.any(String) },
      })
    )
  })
})
