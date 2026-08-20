import { describe, it, expect, vi } from 'vitest'
import { formatResponsiveImage, parseResponsiveImage, getThumbnailUrl } from '../image-utils'

describe('Image Utils', () => {
  describe('formatResponsiveImage', () => {
    it('formats complete image sizes to JSON string', () => {
      const input = {
        thumbnail: 'thumb.jpg',
        small: 'small.jpg',
        medium: 'medium.jpg',
        large: 'large.jpg',
        original: 'original.jpg',
      }

      const result = formatResponsiveImage(input)
      const parsed = JSON.parse(result)

      expect(parsed.thumbnail).toBe('thumb.jpg')
      expect(parsed.small).toBe('small.jpg')
      expect(parsed.medium).toBe('medium.jpg')
      expect(parsed.large).toBe('large.jpg')
      expect(parsed.original).toBe('original.jpg')
    })

    it('formats partial image sizes', () => {
      const input = {
        small: 'small.jpg',
        medium: 'medium.jpg',
        large: 'large.jpg',
      }

      const result = formatResponsiveImage(input)
      const parsed = JSON.parse(result)

      expect(parsed.small).toBe('small.jpg')
      expect(parsed.thumbnail).toBeUndefined()
      expect(parsed.original).toBeUndefined()
    })
  })

  describe('parseResponsiveImage', () => {
    it('parses valid JSON with all required fields', () => {
      const jsonString = JSON.stringify({
        thumbnail: 'thumb.jpg',
        small: 'small.jpg',
        medium: 'medium.jpg',
        large: 'large.jpg',
        original: 'original.jpg',
      })

      const result = parseResponsiveImage(jsonString)

      expect(result).not.toBeNull()
      expect(result).toHaveProperty('small', 'small.jpg')
      expect(result).toHaveProperty('medium', 'medium.jpg')
      expect(result).toHaveProperty('large', 'large.jpg')
    })

    it('returns null for JSON missing required fields', () => {
      const jsonString = JSON.stringify({
        thumbnail: 'thumb.jpg',
        small: 'small.jpg',
        // missing medium and large
      })

      const result = parseResponsiveImage(jsonString)
      expect(result).toBeNull()
    })

    it('parses old format (simple URL string)', () => {
      const url = 'https://example.com/image.jpg'
      const result = parseResponsiveImage(url)

      expect(result).toEqual({ url })
    })

    it('returns null for empty string', () => {
      const result = parseResponsiveImage('')
      expect(result).toBeNull()
    })

    it('falls back to URL for invalid JSON', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
      const invalidJson = '{ invalid json'
      const result = parseResponsiveImage(invalidJson)

      expect(result).toEqual({ url: invalidJson })
      expect(consoleErrorSpy).toHaveBeenCalled()

      consoleErrorSpy.mockRestore()
    })

    it('handles JSON with extra whitespace', () => {
      const jsonString = `
           {
             "small": "small.jpg",
             "medium": "medium.jpg",
             "large": "large.jpg"
           }
         `

      const result = parseResponsiveImage(jsonString)
      expect(result).not.toBeNull()
      expect(result).toHaveProperty('small', 'small.jpg')
    })
  })

  describe('getThumbnailUrl', () => {
    it('returns thumbnail if available', () => {
      const source = JSON.stringify({
        thumbnail: 'thumb.jpg',
        small: 'small.jpg',
        medium: 'medium.jpg',
        large: 'large.jpg',
      })

      const result = getThumbnailUrl(source)
      expect(result).toBe('thumb.jpg')
    })

    it('falls back to small if no thumbnail', () => {
      const source = JSON.stringify({
        small: 'small.jpg',
        medium: 'medium.jpg',
        large: 'large.jpg',
      })

      const result = getThumbnailUrl(source)
      expect(result).toBe('small.jpg')
    })

    it('returns url for old format', () => {
      const source = 'https://example.com/image.jpg'
      const result = getThumbnailUrl(source)

      expect(result).toBe('https://example.com/image.jpg')
    })

    it('returns null for null input', () => {
      const result = getThumbnailUrl(null)
      expect(result).toBeNull()
    })

    it('returns null for undefined input', () => {
      const result = getThumbnailUrl(undefined)
      expect(result).toBeNull()
    })

    it('returns null for empty string', () => {
      const result = getThumbnailUrl('')
      expect(result).toBeNull()
    })

    it('returns null for invalid JSON missing required fields', () => {
      const source = JSON.stringify({
        thumbnail: 'thumb.jpg',
        // missing small, medium, large
      })

      const result = getThumbnailUrl(source)
      expect(result).toBeNull()
    })
  })
})