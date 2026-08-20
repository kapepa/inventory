import { describe, it, expect, vi, beforeEach } from 'vitest'
import { deleteCategory } from '../category-service'
import { prisma } from '@/shared/lib/prisma'

vi.mock('@/shared/lib/prisma', () => ({
  prisma: {
    category: {
      delete: vi.fn(),
    },
  },
}))

describe('Delete Category Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockCategory = {
    id: 'category-123',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  it('deletes category successfully', async () => {
    vi.mocked(prisma.category.delete).mockResolvedValue(mockCategory as any)

    const result = await deleteCategory('category-123')

    expect(result).toEqual(mockCategory)
  })

  it('returns deleted category data', async () => {
    vi.mocked(prisma.category.delete).mockResolvedValue(mockCategory as any)

    const result = await deleteCategory('category-123')

    expect(result).toBeDefined()
    expect(result.id).toBe('category-123')
  })

  it('calls prisma.category.delete with correct id', async () => {
    vi.mocked(prisma.category.delete).mockResolvedValue(mockCategory as any)

    await deleteCategory('category-123')

    expect(prisma.category.delete).toHaveBeenCalledWith({
      where: { id: 'category-123' },
    })
  })

  it('logs and rethrows Prisma errors', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
    const prismaError = new Error('Database connection failed')

    vi.mocked(prisma.category.delete).mockRejectedValue(prismaError)

    await expect(deleteCategory('category-123')).rejects.toThrow('Database connection failed')
    expect(consoleErrorSpy).toHaveBeenCalledWith('Prisma Error in deleteCategory:', prismaError)

    consoleErrorSpy.mockRestore()
  })

  it('handles database connection errors', async () => {
    const dbError = new Error('Connection timeout')
    vi.mocked(prisma.category.delete).mockRejectedValue(dbError)

    await expect(deleteCategory('category-123')).rejects.toThrow('Connection timeout')
  })

  it('throws error when category not found', async () => {
    const notFoundError = new Error('Record to delete does not exist')
    vi.mocked(prisma.category.delete).mockRejectedValue(notFoundError)

    await expect(deleteCategory('category-123')).rejects.toThrow()
  })

  it('handles invalid id format', async () => {
    const invalidIdError = new Error('Invalid ID format')
    vi.mocked(prisma.category.delete).mockRejectedValue(invalidIdError)

    await expect(deleteCategory('invalid-id')).rejects.toThrow()
  })
})