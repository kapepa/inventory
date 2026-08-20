import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createProduct } from '../product-service'
import { prisma } from '@/shared/lib/prisma'
import { AlreadyExistsError } from '@/shared/lib/server'
import { ProductStatus } from '@prisma/client'

vi.mock('@/shared/lib/prisma', () => ({
  prisma: {
    product: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
  },
}))

describe('Product Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createProduct', () => {
    const validInput = {
      serialNumber: 'SN-12345',
      order: 1,
      status: ProductStatus.FREE,
      isNew: true,
      photo: 'https://example.com/photo.jpg',
      parishId: 'parish-123',
      categoryId: 'category-456',
      userId: 'user-789',
      translations: [
        {
          locale: 'ru',
          title: 'Тестовый продукт',
          specification: 'Спецификация продукта',
        },
        {
          locale: 'en',
          title: 'Test Product',
          specification: 'Product specification',
        },
      ],
      prices: [
        { value: 1000, symbol: 'UAH' as const },
        { value: 25, symbol: 'USD' as const },
      ],
    }

    const mockContext = {
      input: validInput as any,
      locale: 'ru' as const,
    }

    it('creates product successfully', async () => {
      vi.mocked(prisma.product.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.product.create).mockResolvedValue({
        id: '1',
        serialNumber: 'SN-12345',
        order: 1,
        status: ProductStatus.FREE,
        isNew: true,
        photo: 'https://example.com/photo.jpg',
        parishId: 'parish-123',
        categoryId: 'category-456',
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [
          {
            id: '1',
            locale: 'ru',
            title: 'Тестовый продукт',
            specification: 'Спецификация продукта',
            productId: '1',
          },
        ],
        prices: [
          { id: '1', value: 1000, symbol: 'UAH', productId: '1' },
          { id: '2', value: 25, symbol: 'USD', productId: '1' },
        ],
      } as any)

      const result = await createProduct(mockContext)

      expect(result).toBeDefined()
      expect(result.id).toBe('1')
      expect(result.serialNumber).toBe('SN-12345')
      expect(result.translations).toHaveLength(1)
      expect(result.prices).toHaveLength(2)
    })

    it('creates product with all required fields', async () => {
      vi.mocked(prisma.product.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.product.create).mockResolvedValue({
        id: '1',
        serialNumber: 'SN-12345',
        order: 1,
        status: ProductStatus.FREE,
        isNew: true,
        photo: 'https://example.com/photo.jpg',
        parishId: 'parish-123',
        categoryId: 'category-456',
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
        prices: [],
      } as any)

      await createProduct(mockContext)

      expect(prisma.product.create).toHaveBeenCalledWith({
        data: {
          serialNumber: 'SN-12345',
          order: 1,
          status: ProductStatus.FREE,
          isNew: true,
          photo: 'https://example.com/photo.jpg',
          parishId: 'parish-123',
          categoryId: 'category-456',
          translations: {
            create: validInput.translations,
          },
          prices: {
            create: validInput.prices,
          },
        },
        include: {
          translations: {
            where: { locale: 'ru' },
          },
          prices: true,
        },
      })
    })

    it('creates product with null photo', async () => {
      vi.mocked(prisma.product.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.product.create).mockResolvedValue({
        id: '1',
        serialNumber: 'SN-12345',
        order: 1,
        status: ProductStatus.FREE,
        isNew: false,
        photo: null,
        parishId: 'parish-123',
        categoryId: 'category-456',
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
        prices: [],
      } as any)

      const inputWithoutPhoto = {
        ...validInput,
        photo: null,
      }

      await createProduct({ input: inputWithoutPhoto as any, locale: 'ru' as const })

      expect(prisma.product.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            photo: null,
          }),
        })
      )
    })

    it('throws AlreadyExistsError when product with same title exists', async () => {
      vi.mocked(prisma.product.findFirst).mockResolvedValue({
        id: '1',
        serialNumber: 'SN-00000',
        order: 1,
        status: ProductStatus.FREE,
        isNew: true,
        photo: null,
        parishId: 'parish-123',
        categoryId: 'category-456',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any)

      await expect(createProduct(mockContext)).rejects.toThrow(AlreadyExistsError)
      await expect(createProduct(mockContext)).rejects.toThrow('Product')
      expect(prisma.product.create).not.toHaveBeenCalled()
    })

    it('checks all translation titles for duplicates', async () => {
      vi.mocked(prisma.product.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.product.create).mockResolvedValue({
        id: '1',
        serialNumber: 'SN-12345',
        order: 1,
        status: ProductStatus.FREE,
        isNew: true,
        photo: null,
        parishId: 'parish-123',
        categoryId: 'category-456',
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
        prices: [],
      } as any)

      await createProduct(mockContext)

      expect(prisma.product.findFirst).toHaveBeenCalledWith({
        where: {
          translations: {
            some: {
              title: {
                in: ['Тестовый продукт', 'Test Product'],
              },
            },
          },
        },
      })
    })

    it('includes translations filtered by locale', async () => {
      vi.mocked(prisma.product.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.product.create).mockResolvedValue({
        id: '1',
        serialNumber: 'SN-12345',
        order: 1,
        status: ProductStatus.FREE,
        isNew: true,
        photo: null,
        parishId: 'parish-123',
        categoryId: 'category-456',
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
        prices: [],
      } as any)

      await createProduct({ ...mockContext, locale: 'en' as const })

      expect(prisma.product.create).toHaveBeenCalledWith(
        expect.objectContaining({
          include: expect.objectContaining({
            translations: {
              where: { locale: 'en' },
            },
          }),
        })
      )
    })

    it('creates product with multiple prices', async () => {
      vi.mocked(prisma.product.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.product.create).mockResolvedValue({
        id: '1',
        serialNumber: 'SN-12345',
        order: 1,
        status: ProductStatus.FREE,
        isNew: true,
        photo: null,
        parishId: 'parish-123',
        categoryId: 'category-456',
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
        prices: [
          { id: '1', value: 1000, symbol: 'UAH', productId: '1' },
          { id: '2', value: 25, symbol: 'USD', productId: '1' },
        ],
      } as any)

      await createProduct(mockContext)

      expect(prisma.product.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            prices: {
              create: [
                { value: 1000, symbol: 'UAH' },
                { value: 25, symbol: 'USD' },
              ],
            },
          }),
        })
      )
    })

    it('validates input with server schema', async () => {
      const invalidInput = {
        ...validInput,
        serialNumber: '', // Empty - should fail validation
      }

      await expect(
        createProduct({ input: invalidInput as any, locale: 'ru' as const })
      ).rejects.toThrow()
    })

    it('logs and rethrows Prisma errors', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
      const prismaError = new Error('Database connection failed')

      vi.mocked(prisma.product.findFirst).mockRejectedValue(prismaError)

      await expect(createProduct(mockContext)).rejects.toThrow('Database connection failed')
      expect(consoleErrorSpy).toHaveBeenCalledWith('Prisma Error in createProduct:', prismaError)

      consoleErrorSpy.mockRestore()
    })

    it('creates product with different status values', async () => {
      vi.mocked(prisma.product.findFirst).mockResolvedValue(null)

      const statuses = [ProductStatus.FREE, ProductStatus.BUSY, ProductStatus.REPAIR]

      for (const status of statuses) {
        vi.mocked(prisma.product.create).mockResolvedValue({
          id: '1',
          serialNumber: 'SN-12345',
          order: 1,
          status: status,
          isNew: true,
          photo: null,
          parishId: 'parish-123',
          categoryId: 'category-456',
          createdAt: new Date(),
          updatedAt: new Date(),
          translations: [],
          prices: [],
        } as any)

        const inputWithStatus = { ...validInput, status }
        const result = await createProduct({ input: inputWithStatus as any, locale: 'ru' as const })

        expect(result.status).toBe(status)
      }
    })
  })
})