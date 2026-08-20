import { describe, it, expect, vi, beforeEach } from 'vitest'
import { changePasswordService } from '../change-password-service'
import { prisma } from '@/shared/lib/prisma'
import { NotFoundError, InvalidInputError } from '@/shared/lib/server'
import { InvalidCredentialsError } from '@/shared/lib/errors'
import * as authLib from '@/shared/lib/auth'

vi.mock('@/shared/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}))

vi.mock('@/shared/lib/auth', () => ({
  comparePassword: vi.fn(),
  hashPassword: vi.fn(),
}))

describe('Password Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('changePasswordService', () => {
    const validBody = {
      currentPassword: 'OldPass123!',
      newPassword: 'NewPass456!',
      userId: 'user-123',
    }

    const mockUser = {
      id: 'user-123',
      email: 'test@test.com',
      password: 'hashed_old_password',
    }

    it('changes password successfully', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(authLib.comparePassword).mockResolvedValue(true as never)
      vi.mocked(authLib.hashPassword).mockResolvedValue('hashed_new_password' as never)
      vi.mocked(prisma.user.update).mockResolvedValue(mockUser as any)

      await changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any })

      expect(prisma.user.update).toHaveBeenCalled()
    })

    it('throws NotFoundError when user not found', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null)

      await expect(changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any }))
        .rejects.toThrow(NotFoundError)
    })

    it('throws InvalidCredentialsError when currentPassword is incorrect', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(authLib.comparePassword).mockResolvedValue(false as never)

      await expect(changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any }))
        .rejects.toThrow(InvalidCredentialsError)
    })

    it('verifies currentPassword with comparePassword', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(authLib.comparePassword).mockResolvedValue(true as never)
      vi.mocked(authLib.hashPassword).mockResolvedValue('hashed_new_password' as never)
      vi.mocked(prisma.user.update).mockResolvedValue(mockUser as any)

      await changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any })

      expect(authLib.comparePassword).toHaveBeenCalledWith('OldPass123!', 'hashed_old_password')
    })

    it('hashes newPassword before saving', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(authLib.comparePassword).mockResolvedValue(true as never)
      vi.mocked(authLib.hashPassword).mockResolvedValue('hashed_new_password' as never)
      vi.mocked(prisma.user.update).mockResolvedValue(mockUser as any)

      await changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any })

      expect(authLib.hashPassword).toHaveBeenCalledWith('NewPass456!')
    })

    it('updates user password in database', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(authLib.comparePassword).mockResolvedValue(true as never)
      vi.mocked(authLib.hashPassword).mockResolvedValue('hashed_new_password' as never)
      vi.mocked(prisma.user.update).mockResolvedValue(mockUser as any)

      await changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any })

      expect(prisma.user.update).toHaveBeenCalled()
    })

    it('calls prisma.user.update with correct userId', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(authLib.comparePassword).mockResolvedValue(true as never)
      vi.mocked(authLib.hashPassword).mockResolvedValue('hashed_new_password' as never)
      vi.mocked(prisma.user.update).mockResolvedValue(mockUser as any)

      await changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any })

      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'user-123' },
        })
      )
    })

    it('calls prisma.user.update with hashed password', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(authLib.comparePassword).mockResolvedValue(true as never)
      vi.mocked(authLib.hashPassword).mockResolvedValue('hashed_new_password' as never)
      vi.mocked(prisma.user.update).mockResolvedValue(mockUser as any)

      await changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any })

      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { password: 'hashed_new_password' },
        })
      )
    })

    it('validates input with server schema', async () => {
      const invalidBody = {
        currentPassword: '',
        newPassword: 'NewPass456!',
      }

      await expect(
        changePasswordService({ body: invalidBody as any, user: { id: 'user-123' } as any })
      ).rejects.toThrow()
    })

    it('rejects invalid input (short password)', async () => {
      const invalidBody = {
        currentPassword: 'OldPass123!',
        newPassword: 'abc',
      }

      await expect(
        changePasswordService({ body: invalidBody as any, user: { id: 'user-123' } as any })
      ).rejects.toThrow()
    })

    it('throws error when newPassword equals currentPassword', async () => {
      const samePassword = {
        currentPassword: 'SamePass123!',
        newPassword: 'SamePass123!',
        userId: 'user-123',
      }

      await expect(
        changePasswordService({ body: samePassword as any, user: { id: 'user-123' } as any })
      ).rejects.toThrow('New password must be different from current password')
    })

    it('throws NotFoundError when user does not exist', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null)

      await expect(changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any }))
        .rejects.toThrow(NotFoundError)
      expect(prisma.user.update).not.toHaveBeenCalled()
    })

    it('throws InvalidCredentialsError when currentPassword wrong', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(authLib.comparePassword).mockResolvedValue(false as never)

      await expect(changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any }))
        .rejects.toThrow(InvalidCredentialsError)
      expect(prisma.user.update).not.toHaveBeenCalled()
    })

    it('handles database connection errors', async () => {
      const dbError = new Error('Connection timeout')
      vi.mocked(prisma.user.findUnique).mockRejectedValue(dbError)

      await expect(changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any }))
        .rejects.toThrow('Connection timeout')
    })

    it('handles hash password errors', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(authLib.comparePassword).mockResolvedValue(true as never)
      vi.mocked(authLib.hashPassword).mockRejectedValue(new Error('Hashing failed'))

      await expect(changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any }))
        .rejects.toThrow('Hashing failed')
    })

    it('handles compare password errors', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(authLib.comparePassword).mockRejectedValue(new Error('Comparison failed'))

      await expect(changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any }))
        .rejects.toThrow('Comparison failed')
    })

    it('calls prisma.user.findUnique with correct userId', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(authLib.comparePassword).mockResolvedValue(true as never)
      vi.mocked(authLib.hashPassword).mockResolvedValue('hashed_new_password' as never)
      vi.mocked(prisma.user.update).mockResolvedValue(mockUser as any)

      await changePasswordService({ body: validBody as any, user: { id: 'user-123' } as any })

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        select: { id: true, password: true },
      })
    })
  })
})