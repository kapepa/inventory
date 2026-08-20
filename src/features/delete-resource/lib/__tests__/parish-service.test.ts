import { describe, it, expect, vi, beforeEach } from 'vitest'
import { deleteParish } from '../parish-service'
import { prisma } from '@/shared/lib/prisma'

vi.mock('@/shared/lib/prisma', () => ({
  prisma: {
    parish: {
      delete: vi.fn(),
    },
  },
}))

describe('Delete Parish Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockParish = {
    id: 'parish-123',
    parishId: 'parish-123',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  it('deletes parish successfully', async () => {
    vi.mocked(prisma.parish.delete).mockResolvedValue(mockParish as any)

    const result = await deleteParish('parish-123')

    expect(result).toEqual(mockParish)
  })

  it('returns deleted parish data', async () => {
    vi.mocked(prisma.parish.delete).mockResolvedValue(mockParish as any)

    const result = await deleteParish('parish-123')

    expect(result).toBeDefined()
    expect(result.id).toBe('parish-123')
  })

  it('calls prisma.parish.delete with correct id', async () => {
    vi.mocked(prisma.parish.delete).mockResolvedValue(mockParish as any)

    await deleteParish('parish-123')

    expect(prisma.parish.delete).toHaveBeenCalledWith({
      where: { id: 'parish-123' },
    })
  })

  it('logs and rethrows Prisma errors', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
    const prismaError = new Error('Database connection failed')

    vi.mocked(prisma.parish.delete).mockRejectedValue(prismaError)

    await expect(deleteParish('parish-123')).rejects.toThrow('Database connection failed')
    expect(consoleErrorSpy).toHaveBeenCalledWith('Prisma Error in deleteParish:', prismaError)

    consoleErrorSpy.mockRestore()
  })

  it('handles database connection errors', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const dbError = new Error('Connection timeout')
    vi.mocked(prisma.parish.delete).mockRejectedValue(dbError)

    await expect(deleteParish('parish-123')).rejects.toThrow('Connection timeout')

    consoleErrorSpy.mockRestore()
  })

  it('throws error when parish not found', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const notFoundError = new Error('Record to delete does not exist')
    vi.mocked(prisma.parish.delete).mockRejectedValue(notFoundError)

    await expect(deleteParish('parish-123')).rejects.toThrow()

    consoleErrorSpy.mockRestore()
  })

  it('handles invalid id format', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const invalidIdError = new Error('Invalid ID format')
    vi.mocked(prisma.parish.delete).mockRejectedValue(invalidIdError)

    await expect(deleteParish('invalid-id')).rejects.toThrow()

    consoleErrorSpy.mockRestore()
  })
})