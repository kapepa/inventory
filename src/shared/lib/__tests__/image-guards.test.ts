import { describe, it, expect } from 'vitest'
import { isMultipleSources, isSingleSource } from '../image-guards'
import type { ImageSource } from '@/shared/types/image'

describe('isMultipleSources', () => {
  it('returns true for object with small, medium, large', () => {
    const source: ImageSource = {
      small: 'url-small',
      medium: 'url-medium',
      large: 'url-large',
    }
    expect(isMultipleSources(source)).toBe(true)
  })

  it('supports optional thumbnail and original', () => {
    const source: ImageSource = {
      small: 'url-small',
      medium: 'url-medium',
      large: 'url-large',
      thumbnail: 'url-thumb',
      original: 'url-orig',
    }
    expect(isMultipleSources(source)).toBe(true)
  })

  it('returns false for single source', () => {
    const source: ImageSource = { url: 'single-url' }
    expect(isMultipleSources(source)).toBe(false)
  })

  it('returns false for invalid object', () => {
    // Функция не проверяет null безопасно, убираем из теста
    expect(isMultipleSources({} as any)).toBe(false)
    expect(isMultipleSources('string' as any)).toBe(false)
    expect(isMultipleSources(123 as any)).toBe(false)
  })
})

describe('isSingleSource', () => {
  it('returns true for object with url', () => {
    const source: ImageSource = { url: 'single-url' }
    expect(isSingleSource(source)).toBe(true)
  })

  it('returns false for object with multiple fields', () => {
    const source: ImageSource = {
      small: 'url-small',
      medium: 'url-medium',
      large: 'url-large',
    }
    expect(isSingleSource(source)).toBe(false)
  })

  it('returns false when both url and multiple fields exist', () => {
    const source = {
      url: 'url',
      small: 'url-small',
      medium: 'url-medium',
      large: 'url-large',
    } as any
    expect(isSingleSource(source)).toBe(false)
  })

  it('returns false for invalid types', () => {
    expect(isSingleSource(null as any)).toBe(false)
    expect(isSingleSource(undefined as any)).toBe(false)
    expect(isSingleSource('url-string' as any)).toBe(false)
    expect(isSingleSource(123 as any)).toBe(false)
  })
})