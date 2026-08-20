import { describe, it, expect } from 'vitest'
import { getFirstLetter } from '../get-first-letter'

describe('getFirstLetter', () => {
  it('returns first letter in uppercase', () => {
    expect(getFirstLetter('john')).toBe('J')
  })

  it('returns fallback for empty string', () => {
    expect(getFirstLetter('', { fallback: '?' })).toBe('?')
  })

  it('returns fallback for null', () => {
    expect(getFirstLetter(null, { fallback: 'N/A' })).toBe('N/A')
  })

  it('returns fallback for undefined', () => {
    expect(getFirstLetter(undefined, { fallback: 'X' })).toBe('X')
  })

  it('returns lowercase when lowerFirst=true', () => {
    expect(getFirstLetter('John', { lowerFirst: true })).toBe('j')
  })

  it('returns empty string by default', () => {
    expect(getFirstLetter(null)).toBe('')
  })
})