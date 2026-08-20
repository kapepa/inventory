import { describe, it, expect, vi, beforeEach } from 'vitest'
import { deleteProduct } from '../product-service'
import { prisma } from '@/shared/lib/prisma'

vi.mock('@/shared/lib/prisma', () => ({
  prisma: {
    product: {
      delete: vi.fn(),
    },
  },
}))

describe('Delete Product Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockProduct = {
    id: 'product-123',
    serialNumber: 'SN-12345',
    order: 1,
    status: 'FREE',
    isNew: true,
    photo: null,
    parishId: 'parish-123',
    categoryId: 'category-456',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  it('deletes product successfully', async () => {
    vi.mocked(prisma.product.delete).mockResolvedValue(mockProduct as any)

    const result = await deleteProduct('product-123')

    expect(result).toEqual(mockProduct)
  })

  it('returns deleted product data', async () => {
    vi.mocked(prisma.product.delete).mockResolvedValue(mockProduct as any)

    const result = await deleteProduct('product-123')

    expect(result).toBeDefined()
    expect(result.id).toBe('product-123')
  })

  it('calls prisma.product.delete with correct id', async () => {
    vi.mocked(prisma.product.delete).mockResolvedValue(mockProduct as any)

    await deleteProduct('product-123')

    expect(prisma.product.delete).toHaveBeenCalledWith({
      where: { id: 'product-123' },
    })
  })

  it('logs and rethrows Prisma errors', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
    const prismaError = new Error('Database connection failed')

    vi.mocked(prisma.product.delete).mockRejectedValue(prismaError)

    await expect(deleteProduct('product-123')).rejects.toThrow('Database connection failed')
    expect(consoleErrorSpy).toHaveBeenCalledWith('Prisma Error in deleteProduct:', prismaError)

    consoleErrorSpy.mockRestore()
  })

  it('handles database connection errors', async () => {
    const dbError = new Error('Connection timeout')
    vi.mocked(prisma.product.delete).mockRejectedValue(dbError)

    await expect(deleteProduct('product-123')).rejects.toThrow('Connection timeout')
  })

  it('throws error when product not found', async () => {
    const notFoundError = new Error('Record to delete does not exist')
    vi.mocked(prisma.product.delete).mockRejectedValue(notFoundError)

    await expect(deleteProduct('product-123')).rejects.toThrow()
  })

  it('handles invalid id format', async () => {
    const invalidIdError = new Error('Invalid ID format')
    vi.mocked(prisma.product.delete).mockRejectedValue(invalidIdError)

    await expect(deleteProduct('invalid-id')).rejects.toThrow()
  })
})