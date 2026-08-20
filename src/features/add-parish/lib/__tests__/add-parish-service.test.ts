import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createParish } from '../add-parish-service'
import { prisma } from '@/shared/lib/prisma'
import { AlreadyExistsError } from '@/shared/lib/server'

vi.mock('@/shared/lib/prisma', () => ({
  prisma: {
    parish: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
  },
}))

describe('Parish Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createParish', () => {
    const validInput = {
      deliveryDate: '2026-08-20',
      translations: [
        { locale: 'ru', title: 'Тестовый приход', description: 'Описание прихода' },
        { locale: 'en', title: 'Test Parish', description: 'Parish description' },
      ],
    }

    const mockContext = {
      input: validInput as any,
      locale: 'ru' as const,
    }

    it('creates parish successfully', async () => {
      vi.mocked(prisma.parish.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.parish.create).mockResolvedValue({
        id: '1',
        deliveryDate: new Date('2026-08-20'),
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [
          {
            id: '1',
            locale: 'ru',
            title: 'Тестовый приход',
            description: 'Описание прихода',
            parishId: '1',
          },
        ],
        _count: { products: 0 },
      } as any)

      const result = await createParish(mockContext)

      expect(result).toBeDefined()
      expect(result.id).toBe('1')
      expect(result.totals).toEqual({ usd: 0, uah: 0 })
      expect(prisma.parish.findFirst).toHaveBeenCalledWith({
        where: {
          translations: {
            some: {
              title: {
                in: ['Тестовый приход', 'Test Parish'],
              },
            },
          },
        },
      })
    })

    it('converts deliveryDate string to Date object', async () => {
      vi.mocked(prisma.parish.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.parish.create).mockResolvedValue({
        id: '1',
        deliveryDate: new Date('2026-08-20'),
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
        _count: { products: 0 },
      } as any)

      await createParish(mockContext)

      expect(prisma.parish.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            deliveryDate: expect.any(Date),
          }),
        })
      )
    })

    it('handles empty string deliveryDate as null', async () => {
      vi.mocked(prisma.parish.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.parish.create).mockResolvedValue({
        id: '1',
        deliveryDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
        _count: { products: 0 },
      } as any)

      const inputWithoutDate = {
        deliveryDate: '',
        translations: [
          { locale: 'ru', title: 'Тестовый приход', description: 'Описание прихода' },
          { locale: 'en', title: 'Test Parish', description: 'Parish description' },
        ]
      }

      await createParish({ input: inputWithoutDate as any, locale: 'ru' as const })

      expect(prisma.parish.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            deliveryDate: null,
          }),
        })
      )
    })

    it('throws AlreadyExistsError when parish exists', async () => {
      vi.mocked(prisma.parish.findFirst).mockResolvedValue({
        id: '1',
        deliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any)

      await expect(createParish(mockContext)).rejects.toThrow(AlreadyExistsError)
      await expect(createParish(mockContext)).rejects.toThrow('Parish')
      expect(prisma.parish.create).not.toHaveBeenCalled()
    })

    it('validates input with server schema', async () => {
      const invalidInput = {
        deliveryDate: '2026-08-20',
        translations: [
          { locale: 'ru', title: '', description: 'Valid' },
        ],
      }

      await expect(
        createParish({ input: invalidInput as any, locale: 'ru' as const })
      ).rejects.toThrow()
    })

    it('checks all translation titles for duplicates', async () => {
      vi.mocked(prisma.parish.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.parish.create).mockResolvedValue({
        id: '1',
        deliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
        _count: { products: 0 },
      } as any)

      await createParish(mockContext)

      expect(prisma.parish.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            translations: {
              some: {
                title: {
                  in: expect.arrayContaining(['Тестовый приход', 'Test Parish']),
                },
              },
            },
          },
        })
      )
    })

    it('includes translations filtered by locale', async () => {
      vi.mocked(prisma.parish.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.parish.create).mockResolvedValue({
        id: '1',
        deliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
        _count: { products: 0 },
      } as any)

      await createParish({ ...mockContext, locale: 'en' as const })

      expect(prisma.parish.create).toHaveBeenCalledWith(
        expect.objectContaining({
          include: expect.objectContaining({
            translations: {
              where: { locale: 'en' },
            },
          }),
        })
      )
    })

    it('returns parish with default totals', async () => {
      vi.mocked(prisma.parish.findFirst).mockResolvedValue(null)
      vi.mocked(prisma.parish.create).mockResolvedValue({
        id: '1',
        deliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
        _count: { products: 0 },
      } as any)

      const result = await createParish(mockContext)

      expect(result.totals).toEqual({ usd: 0, uah: 0 })
    })

    it('logs and rethrows Prisma errors', async () => {
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => { })
      const prismaError = new Error('Database connection failed')

      vi.mocked(prisma.parish.findFirst).mockRejectedValue(prismaError)

      await expect(createParish(mockContext)).rejects.toThrow('Database connection failed')
      expect(consoleLogSpy).toHaveBeenCalledWith('Prisma Error in createParish:', prismaError)

      consoleLogSpy.mockRestore()
    })
  })
})