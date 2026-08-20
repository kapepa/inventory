import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createCategory } from '../category-service'
import { prisma } from '@/shared/lib/prisma'
import { AlreadyExistsError } from '@/shared/lib/server'

vi.mock('@/shared/lib/prisma', () => ({
  prisma: {
    category: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
  },
}))

describe('Category Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createCategory', () => {
    // Server receives transformed data with translations as array
    const validInput = {
      translations: [
        { locale: 'ru', title: 'Тестовая категория' },
        { locale: 'en', title: 'Test Category' },
      ],
    }

    const mockContext = {
      input: validInput as any, // Type mismatch but this is what server actually receives
      locale: 'ru' as const,
    }

    it('creates category successfully', async () => {
      vi.mocked(prisma.category.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.category.create).mockResolvedValue({
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [
          {
            id: '1',
            locale: 'ru',
            title: 'Тестовая категория',
            categoryId: '1',
          },
        ],
        _count: { products: 0 },
      } as any)

      const result = await createCategory(mockContext)

      expect(result).toBeDefined()
      expect(result.id).toBe('1')
      expect(prisma.category.findFirst).toHaveBeenCalledWith({
        where: {
          translations: {
            some: {
              title: {
                in: ['Тестовая категория', 'Test Category'],
              },
            },
          },
        },
      })
    })

    it('throws AlreadyExistsError when category exists', async () => {
      vi.mocked(prisma.category.findFirst).mockResolvedValue({
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any)

      await expect(createCategory(mockContext)).rejects.toThrow(AlreadyExistsError)
      expect(prisma.category.create).not.toHaveBeenCalled()
    })

    it('validates input with server schema', async () => {
      const invalidInput = {
        translations: [
          { locale: 'ru', title: '' }, // Empty title - should fail validation
        ],
      }

      await expect(
        createCategory({ input: invalidInput as any, locale: 'ru' as const })
      ).rejects.toThrow()
    })
  })
})