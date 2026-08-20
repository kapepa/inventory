import { describe, it, expect } from 'vitest'
import { productCreateServerSchema } from '../schemas-server'
import { VALIDATION_LIMITS } from '@/shared/constants/validation'
import { ProductStatus } from '@prisma/client'

describe('Product Server Schema', () => {
  describe('productCreateServerSchema', () => {
    const validData = {
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
          title: 'Продукт',
          specification: 'Спецификация',
        },
      ],
      prices: [
        { value: 1000, symbol: 'UAH' as const },
      ],
    }

    it('validates correct product data', () => {
      const result = productCreateServerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('trims whitespace from serialNumber', () => {
      const data = {
        ...validData,
        serialNumber: '  SN-12345  ',
      }

      const result = productCreateServerSchema.parse(data)
      expect(result.serialNumber).toBe('SN-12345')
    })

    it('trims whitespace from title', () => {
      const data = {
        ...validData,
        translations: [
          { locale: 'ru', title: '  Продукт  ', specification: 'Спецификация' },
        ],
      }

      const result = productCreateServerSchema.parse(data)
      expect(result.translations[0].title).toBe('Продукт')
    })

    it('trims whitespace from specification', () => {
      const data = {
        ...validData,
        translations: [
          { locale: 'ru', title: 'Продукт', specification: '  Спецификация  ' },
        ],
      }

      const result = productCreateServerSchema.parse(data)
      expect(result.translations[0].specification).toBe('Спецификация')
    })

    it('rejects serialNumber shorter than minimum', () => {
      const shortSerial = 'a'.repeat(VALIDATION_LIMITS.SERIAL_NUM_MIN_PRODUCT - 1)
      const data = {
        ...validData,
        serialNumber: shortSerial,
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects serialNumber longer than maximum', () => {
      const longSerial = 'a'.repeat(VALIDATION_LIMITS.SERIAL_NUM_MAX_PRODUCT + 1)
      const data = {
        ...validData,
        serialNumber: longSerial,
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts serialNumber at minimum length', () => {
      const minSerial = 'a'.repeat(VALIDATION_LIMITS.SERIAL_NUM_MIN_PRODUCT)
      const data = {
        ...validData,
        serialNumber: minSerial,
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts serialNumber at maximum length', () => {
      const maxSerial = 'a'.repeat(VALIDATION_LIMITS.SERIAL_NUM_MAX_PRODUCT)
      const data = {
        ...validData,
        serialNumber: maxSerial,
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects non-positive order', () => {
      const data = {
        ...validData,
        order: 0,
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects negative order', () => {
      const data = {
        ...validData,
        order: -1,
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects order exceeding maximum', () => {
      const data = {
        ...validData,
        order: VALIDATION_LIMITS.ORDER_MAX_PRODUCT + 1,
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects non-integer order', () => {
      const data = {
        ...validData,
        order: 1.5,
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts valid status enum values', () => {
      const statuses = [ProductStatus.FREE, ProductStatus.BUSY, ProductStatus.REPAIR]

      statuses.forEach(status => {
        const data = {
          ...validData,
          status,
        }
        const result = productCreateServerSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })

    it('rejects invalid status value', () => {
      const data = {
        ...validData,
        status: 'INVALID_STATUS',
      }

      const result = productCreateServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('accepts boolean isNew values', () => {
      const dataTrue = { ...validData, isNew: true }
      const dataFalse = { ...validData, isNew: false }

      expect(productCreateServerSchema.safeParse(dataTrue).success).toBe(true)
      expect(productCreateServerSchema.safeParse(dataFalse).success).toBe(true)
    })

    it('rejects non-boolean isNew', () => {
      const data = {
        ...validData,
        isNew: 'true',
      }

      const result = productCreateServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('accepts null photo', () => {
      const data = {
        ...validData,
        photo: null,
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts string photo', () => {
      const data = {
        ...validData,
        photo: 'https://example.com/photo.jpg',
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects empty parishId', () => {
      const data = {
        ...validData,
        parishId: '',
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects parishId exceeding max length', () => {
      const longId = 'a'.repeat(VALIDATION_LIMITS.ID_MAX_LENGTH + 1)
      const data = {
        ...validData,
        parishId: longId,
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects empty categoryId', () => {
      const data = {
        ...validData,
        categoryId: '',
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects empty userId', () => {
      const data = {
        ...validData,
        userId: '',
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects title shorter than minimum', () => {
      const shortTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MIN_PRODUCT - 1)
      const data = {
        ...validData,
        translations: [
          { locale: 'ru', title: shortTitle, specification: 'Valid spec' },
        ],
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects title longer than maximum', () => {
      const longTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MAX_PRODUCT + 1)
      const data = {
        ...validData,
        translations: [
          { locale: 'ru', title: longTitle, specification: 'Valid spec' },
        ],
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects specification shorter than minimum', () => {
      const shortSpec = 'a'.repeat(VALIDATION_LIMITS.SPECIFICATION_MIN_PRODUCT - 1)
      const data = {
        ...validData,
        translations: [
          { locale: 'ru', title: 'Valid title', specification: shortSpec },
        ],
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects specification longer than maximum', () => {
      const longSpec = 'a'.repeat(VALIDATION_LIMITS.SPECIFICATION_MAX_PRODUCT + 1)
      const data = {
        ...validData,
        translations: [
          { locale: 'ru', title: 'Valid title', specification: longSpec },
        ],
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects empty translations array', () => {
      const data = {
        ...validData,
        translations: [],
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects locale with incorrect length', () => {
      const data = {
        ...validData,
        translations: [
          { locale: 'rus', title: 'Продукт', specification: 'Спецификация' },
        ],
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts multiple translations', () => {
      const data = {
        ...validData,
        translations: [
          { locale: 'ru', title: 'Продукт', specification: 'Спецификация' },
          { locale: 'en', title: 'Product', specification: 'Specification' },
        ],
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
      expect(result.data?.translations).toHaveLength(2)
    })

    it('rejects negative price value', () => {
      const data = {
        ...validData,
        prices: [
          { value: -100, symbol: 'UAH' as const },
        ],
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects price value exceeding maximum', () => {
      const data = {
        ...validData,
        prices: [
          { value: VALIDATION_LIMITS.PRICE_MAX_VALUE + 1, symbol: 'UAH' as const },
        ],
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts zero price value', () => {
      const data = {
        ...validData,
        prices: [
          { value: 0, symbol: 'UAH' as const },
        ],
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts valid price symbols', () => {
      const data = {
        ...validData,
        prices: [
          { value: 1000, symbol: 'UAH' as const },
          { value: 25, symbol: 'USD' as const },
        ],
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts valid price symbols', () => {
      const data = {
        ...validData,
        prices: [
          { value: 1000, symbol: 'UAH' as const },
          { value: 25, symbol: 'USD' as const },
        ],
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects invalid price symbol', () => {
      const data = {
        ...validData,
        prices: [
          { value: 1000, symbol: 'EUR' },
        ],
      }

      const result = productCreateServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('accepts empty prices array', () => {
      const data = {
        ...validData,
        prices: [],
      }

      const result = productCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects missing required fields', () => {
      const fields = ['serialNumber', 'order', 'status', 'isNew', 'parishId', 'categoryId', 'userId', 'translations', 'prices']

      fields.forEach(field => {
        const data = { ...validData }
        delete (data as any)[field]

        const result = productCreateServerSchema.safeParse(data)
        expect(result.success).toBe(false)
      })
    })
  })
})