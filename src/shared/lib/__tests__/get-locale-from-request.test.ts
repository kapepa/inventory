import { describe, it, expect, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { getLocaleFromRequest } from '../get-locale-from-request'

describe('getLocaleFromRequest', () => {
  const createMockRequest = (acceptLanguage: string | null): NextRequest => {
    return {
      headers: {
        get: vi.fn((header: string) => {
          if (header === 'Accept-Language') return acceptLanguage
          return null
        }),
      },
    } as unknown as NextRequest
  }

  it('extracts en locale from Accept-Language header', () => {
    const request = createMockRequest('en-US,en;q=0.9')
    const locale = getLocaleFromRequest(request)
    expect(locale).toBe('en')
  })

  it('extracts ru locale from Accept-Language header', () => {
    const request = createMockRequest('ru-RU,ru;q=0.9')
    const locale = getLocaleFromRequest(request)
    expect(locale).toBe('ru')
  })

  it('returns default locale (ru) for unsupported language', () => {
    const request = createMockRequest('de-DE,de;q=0.9')
    const locale = getLocaleFromRequest(request)
    expect(locale).toBe('ru')
  })

  it('handles simple language code', () => {
    const request = createMockRequest('en')
    const locale = getLocaleFromRequest(request)
    expect(locale).toBe('en')
  })

  it('normalizes to lowercase', () => {
    const request = createMockRequest('EN-US')
    const locale = getLocaleFromRequest(request)
    expect(locale).toBe('en')
  })

  it('takes first language from comma-separated list', () => {
    const request = createMockRequest('en,ru;q=0.8')
    const locale = getLocaleFromRequest(request)
    expect(locale).toBe('en')
  })

  it('strips region code', () => {
    const request = createMockRequest('en-US')
    const locale = getLocaleFromRequest(request)
    expect(locale).toBe('en')
  })

  it('returns default locale (ru) when header is null', () => {
    const request = createMockRequest(null)
    const locale = getLocaleFromRequest(request)
    expect(locale).toBe('ru')
  })

  it('handles whitespace in header', () => {
    const request = createMockRequest('  en-US  ')
    const locale = getLocaleFromRequest(request)
    expect(locale).toBe('en')
  })

  it('returns default locale for unsupported uk locale', () => {
    const request = createMockRequest('uk-UA')
    const locale = getLocaleFromRequest(request)
    expect(locale).toBe('ru')
  })
})