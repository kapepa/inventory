import { describe, it, expect, vi } from 'vitest'
import { createCategoryFormSchema } from '../schemas-client'
import { VALIDATION_LIMITS } from '@/shared/constants/validation'

describe('Category Client Schema', () => {
  // Mock translation function
  const mockT = vi.fn((key: string) => {
    const translations: Record<string, string> = {
      'err-title-min': `Title must be at least ${VALIDATION_LIMITS.TITLE_MIN_CATEGORY} characters`,
      'err-title-max': `Title must be at most ${VALIDATION_LIMITS.TITLE_MAX_CATEGORY} characters`,
    }
    return translations[key] || key
  })

  describe('createCategoryFormSchema', () => {
    it('validates correct form data', () => {
      const schema = createCategoryFormSchema(mockT)
      const validData = {
        translations: {
          ru: { locale: 'ru', title: 'Тестовая категория' },
          en: { locale: 'en', title: 'Test Category' },
        },
      }

      const result = schema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('trims whitespace from titles', () => {
      const schema = createCategoryFormSchema(mockT)
      const data = {
        translations: {
          ru: { locale: 'ru', title: '  Категория  ' },
          en: { locale: 'en', title: '  Category  ' },
        },
      }

      const result = schema.parse(data)
      expect(result.translations.ru.title).toBe('Категория')
      expect(result.translations.en.title).toBe('Category')
    })

    it('rejects title shorter than minimum for ru', () => {
      const schema = createCategoryFormSchema(mockT)
      const shortTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MIN_CATEGORY - 1)
      const data = {
        translations: {
          ru: { locale: 'ru', title: shortTitle },
          en: { locale: 'en', title: 'Valid Title' },
        },
      }

      const result = schema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least')
      }
    })

    it('rejects title shorter than minimum for en', () => {
      const schema = createCategoryFormSchema(mockT)
      const shortTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MIN_CATEGORY - 1)
      const data = {
        translations: {
          ru: { locale: 'ru', title: 'Валидное название' },
          en: { locale: 'en', title: shortTitle },
        },
      }

      const result = schema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects title longer than maximum', () => {
      const schema = createCategoryFormSchema(mockT)
      const longTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MAX_CATEGORY + 1)
      const data = {
        translations: {
          ru: { locale: 'ru', title: longTitle },
          en: { locale: 'en', title: 'Valid Title' },
        },
      }

      const result = schema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at most')
      }
    })

    it('accepts title at minimum length', () => {
      const schema = createCategoryFormSchema(mockT)
      const minTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MIN_CATEGORY)
      const data = {
        translations: {
          ru: { locale: 'ru', title: minTitle },
          en: { locale: 'en', title: minTitle },
        },
      }

      const result = schema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts title at maximum length', () => {
      const schema = createCategoryFormSchema(mockT)
      const maxTitle = 'a'.repeat(VALIDATION_LIMITS.TITLE_MAX_CATEGORY)
      const data = {
        translations: {
          ru: { locale: 'ru', title: maxTitle },
          en: { locale: 'en', title: maxTitle },
        },
      }

      const result = schema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('requires both ru and en translations', () => {
      const schema = createCategoryFormSchema(mockT)
      const data = {
        translations: {
          ru: { locale: 'ru', title: 'Категория' },
        },
      }

      const result = schema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects wrong locale literal for ru', () => {
      const schema = createCategoryFormSchema(mockT)
      const data = {
        translations: {
          ru: { locale: 'en', title: 'Category' }, // Wrong locale
          en: { locale: 'en', title: 'Category' },
        },
      }

      const result = schema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects wrong locale literal for en', () => {
      const schema = createCategoryFormSchema(mockT)
      const data = {
        translations: {
          ru: { locale: 'ru', title: 'Категория' },
          en: { locale: 'ru', title: 'Категория' }, // Wrong locale
        },
      }

      const result = schema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects empty string for title', () => {
      const schema = createCategoryFormSchema(mockT)
      const data = {
        translations: {
          ru: { locale: 'ru', title: '' },
          en: { locale: 'en', title: 'Category' },
        },
      }

      const result = schema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('uses translation function for error messages', () => {
      const schema = createCategoryFormSchema(mockT)
      const shortTitle = 'a'
      const data = {
        translations: {
          ru: { locale: 'ru', title: shortTitle },
          en: { locale: 'en', title: 'Valid' },
        },
      }

      schema.safeParse(data)
      expect(mockT).toHaveBeenCalledWith('err-title-min')
    })

    it('rejects missing translations field', () => {
      const schema = createCategoryFormSchema(mockT)
      const data = {}

      const result = schema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})