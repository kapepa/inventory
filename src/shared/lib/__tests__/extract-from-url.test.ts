import { extractFromUrl } from '@/entities/upload/lib/extract-from-url'
import { describe, it, expect } from 'vitest'

describe('extractFromUrl', () => {
  it('extracts publicId from Cloudinary URL with version', () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg'
    expect(extractFromUrl(url)).toBe('v1234567890/sample')
  })

  it('extracts publicId without version', () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
    expect(extractFromUrl(url)).toBe('sample')
  })

  it('removes transformation parameters (filters a-z_ prefix)', () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/c_fill,w_100/sample.jpg'
    expect(extractFromUrl(url)).toBe('sample')
  })

  it('removes query parameters', () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/sample.jpg?version=123'
    expect(extractFromUrl(url)).toBe('sample')
  })

  it('supports nested folders', () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/folder/subfolder/image.jpg'
    expect(extractFromUrl(url)).toBe('folder/subfolder/image')
  })

  it('returns null for invalid URL', () => {
    expect(extractFromUrl('https://example.com/image.jpg')).toBeNull()
  })

  it('returns null on parsing error', () => {
    expect(extractFromUrl('')).toBeNull()
  })
})