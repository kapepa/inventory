import { describe, it, expect } from 'vitest'
import { parishCreateServerSchema } from '../schemas-server'
import { VALIDATION_LIMITS } from '@/shared/constants/validation'

describe('Parish Server Schema', () => {
  describe('parishCreateServerSchema', () => {
    it('validates correct parish data', () => {
      const validData = {
        deliveryDate: '2026-08-20',
        translations: [
          { locale: 'ru', title: 'Приход', description: 'Описание прихода' },
          { locale: 'en', title: 'Parish', description: 'Parish description' },
        ],
      }

      const result = parishCreateServerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('accepts Date object for deliveryDate', () => {
      const validData = {
        deliveryDate: new Date('2026-08-20'),
        translations: [
          { locale: 'ru', title: 'Приход', description: 'Описание' },
        ],
      }

      const result = parishCreateServerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('trims whitespace from title and locale', () => {
      const data = {
        deliveryDate: '2026-08-20',
        translations: [
          { locale: 'ru', title: '  Приход  ', description: 'Описание' },
        ],
      }

      const result = parishCreateServerSchema.parse(data)
      expect(result.translations[0].title).toBe('Приход')
      expect(result.translations[0].locale).toBe('ru')
    })

    it('rejects title shorter than minimum', () => {
      const shortTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MIN_PARISH - 1)
      const data = {
        deliveryDate: '2026-08-20',
        translations: [
          { locale: 'ru', title: shortTitle, description: 'Valid description' },
        ],
      }

      const result = parishCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects title longer than maximum', () => {
      const longTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MAX_PARISH + 1)
      const data = {
        deliveryDate: '2026-08-20',
        translations: [
          { locale: 'ru', title: longTitle, description: 'Valid description' },
        ],
      }

      const result = parishCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects description shorter than minimum', () => {
      const shortDesc = 'a'.repeat(VALIDATION_LIMITS.DESC_MIN_PARISH - 1)
      const data = {
        deliveryDate: '2026-08-20',
        translations: [
          { locale: 'ru', title: 'Valid Title', description: shortDesc },
        ],
      }

      const result = parishCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects description longer than maximum', () => {
      const longDesc = 'a'.repeat(VALIDATION_LIMITS.DESC_MAX_PARISH + 1)
      const data = {
        deliveryDate: '2026-08-20',
        translations: [
          { locale: 'ru', title: 'Valid Title', description: longDesc },
        ],
      }

      const result = parishCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts title at minimum length', () => {
      const minTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MIN_PARISH)
      const data = {
        deliveryDate: '2026-08-20',
        translations: [
          { locale: 'ru', title: minTitle, description: 'Valid description' },
        ],
      }

      const result = parishCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts title at maximum length', () => {
      const maxTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MAX_PARISH)
      const data = {
        deliveryDate: '2026-08-20',
        translations: [
          { locale: 'ru', title: maxTitle, description: 'Valid description' },
        ],
      }

      const result = parishCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects empty translations array', () => {
      const data = {
        deliveryDate: '2026-08-20',
        translations: [],
      }

      const result = parishCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects locale with incorrect length', () => {
      const data = {
        deliveryDate: '2026-08-20',
        translations: [
          { locale: 'rus', title: 'Приход', description: 'Описание' },
        ],
      }

      const result = parishCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects missing title', () => {
      const data = {
        deliveryDate: '2026-08-20',
        translations: [
          { locale: 'ru', description: 'Описание' },
        ],
      }

      const result = parishCreateServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('rejects missing description', () => {
      const data = {
        deliveryDate: '2026-08-20',
        translations: [
          { locale: 'ru', title: 'Приход' },
        ],
      }

      const result = parishCreateServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('rejects missing deliveryDate', () => {
      const data = {
        translations: [
          { locale: 'ru', title: 'Приход', description: 'Описание' },
        ],
      }

      const result = parishCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts multiple translations', () => {
      const data = {
        deliveryDate: '2026-08-20',
        translations: [
          { locale: 'ru', title: 'Приход', description: 'Описание' },
          { locale: 'en', title: 'Parish', description: 'Description' },
          { locale: 'uk', title: 'Прихід', description: 'Опис' },
        ],
      }

      const result = parishCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
      expect(result.data?.translations).toHaveLength(3)
    })
  })
})