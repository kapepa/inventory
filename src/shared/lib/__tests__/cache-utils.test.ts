import { describe, it, expect } from 'vitest'
import {
  createCacheEntityTag,
  createCacheKey,
  createCacheLocalizedPath,
} from '../cache-utils'

describe('Cache Utils', () => {
  describe('createCacheEntityTag', () => {
    it('creates tag from entity and id', () => {
      const tag = createCacheEntityTag('product', '123')
      expect(tag).toBe('product-123')
    })

    it('works with different entity types', () => {
      expect(createCacheEntityTag('user', 'abc')).toBe('user-abc')
      expect(createCacheEntityTag('category', '456')).toBe('category-456')
    })

    it('handles numeric-like string ids', () => {
      const tag = createCacheEntityTag('order', '99999')
      expect(tag).toBe('order-99999')
    })
  })

  describe('createCacheKey', () => {
    it('creates key from single part', () => {
      const key = createCacheKey('products')
      expect(key).toBe('products')
    })

    it('creates key from multiple string parts', () => {
      const key = createCacheKey('products', 'list', 'page')
      expect(key).toBe('products-list-page')
    })
    it('creates key from multiple string parts', () => {
      const key = createCacheKey('products', 'list', 'page')
      expect(key).toBe('products-list-page')
    })

    it('creates key from mixed string and number parts', () => {
      const key = createCacheKey('user', 123, 'profile')
      expect(key).toBe('user-123-profile')
    })

    it('creates key from only numbers', () => {
      const key = createCacheKey(1, 2, 3)
      expect(key).toBe('1-2-3')
    })

    it('handles empty array', () => {
      const key = createCacheKey()
      expect(key).toBe('')
    })

    it('handles single number', () => {
      const key = createCacheKey(42)
      expect(key).toBe('42')
    })
  })

  describe('createCacheLocalizedPath', () => {
    it('creates localized path', () => {
      const path = createCacheLocalizedPath('uk', 'products')
      expect(path).toBe('/uk/products')
    })

    it('works with different locales', () => {
      expect(createCacheLocalizedPath('en', 'about')).toBe('/en/about')
      expect(createCacheLocalizedPath('ru', 'contact')).toBe('/ru/contact')
    })

    it('handles paths with slashes', () => {
      const path = createCacheLocalizedPath('uk', 'products/123')
      expect(path).toBe('/uk/products/123')
    })

    it('handles empty path', () => {
      const path = createCacheLocalizedPath('en', '')
      expect(path).toBe('/en/')
    })
  })
})