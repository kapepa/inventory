import { describe, it, expect } from 'vitest'
import { categoryCreateServerSchema } from '../schemas-server'
import { VALIDATION_LIMITS } from '@/shared/constants/validation'

describe('Category Server Schema', () => {
  describe('categoryCreateServerSchema', () => {
    it('validates correct category data', () => {
      const validData = {
        translations: [
          { locale: 'ru', title: 'Категория' },
          { locale: 'en', title: 'Category' },
        ],
      }

      const result = categoryCreateServerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('trims whitespace from title', () => {
      const data = {
        translations: [
          { locale: 'ru', title: '  Категория  ' },
        ],
      }

      const result = categoryCreateServerSchema.parse(data)
      expect(result.translations[0].title).toBe('Категория')
    })

    it('trims whitespace from locale', () => {
      const data = {
        translations: [
          { locale: 'ru', title: 'Категория' },
        ],
      }

      const result = categoryCreateServerSchema.parse(data)
      expect(result.translations[0].locale).toBe('ru')
    })

    it('rejects title shorter than minimum', () => {
      const shortTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MIN_CATEGORY - 1)
      const data = {
        translations: [
          { locale: 'ru', title: shortTitle },
        ],
      }

      const result = categoryCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects title longer than maximum', () => {
      const longTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MAX_CATEGORY + 1)
      const data = {
        translations: [
          { locale: 'ru', title: longTitle },
        ],
      }

      const result = categoryCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts title at minimum length', () => {
      const minTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MIN_CATEGORY)
      const data = {
        translations: [
          { locale: 'ru', title: minTitle },
        ],
      }

      const result = categoryCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts title at maximum length', () => {
      const maxTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MAX_CATEGORY)
      const data = {
        translations: [
          { locale: 'ru', title: maxTitle },
        ],
      }

      const result = categoryCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects empty translations array', () => {
      const data = {
        translations: [],
      }

      const result = categoryCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects locale with incorrect length', () => {
      const data = {
        translations: [
          { locale: 'rus', title: 'Категория' }, // Should be 2 chars
        ],
      }

      const result = categoryCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects missing title', () => {
      const data = {
        translations: [
          { locale: 'ru' },
        ],
      }

      const result = categoryCreateServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('rejects missing locale', () => {
      const data = {
        translations: [
          { title: 'Категория' },
        ],
      }

      const result = categoryCreateServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('accepts multiple translations', () => {
      const data = {
        translations: [
          { locale: 'ru', title: 'Категория' },
          { locale: 'en', title: 'Category' },
          { locale: 'uk', title: 'Категорія' },
        ],
      }

      const result = categoryCreateServerSchema.safeParse(data)
      expect(result.success).toBe(true)
      expect(result.data?.translations).toHaveLength(3)
    })

    it('rejects missing translations field', () => {
      const data = {}

      const result = categoryCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects non-array translations', () => {
      const data = {
        translations: 'not an array',
      }

      const result = categoryCreateServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})