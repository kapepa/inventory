import { describe, it, expect } from 'vitest'
import { parseCookies } from '../parse-cookies'

describe('parseCookies', () => {
  it('parses simple cookie string', () => {
    const result = parseCookies('name=value')
    expect(result).toEqual({ name: 'value' })
  })

  it('parses multiple cookies', () => {
    const result = parseCookies('name1=value1; name2=value2')
    expect(result).toEqual({
      name1: 'value1',
      name2: 'value2',
    })
  })

  it('handles URL-encoded values', () => {
    const result = parseCookies('user=John%20Doe; email=test%40example.com')
    expect(result).toEqual({
      user: 'John Doe',
      email: 'test@example.com',
    })
  })

  it('handles cookies with spaces around', () => {
    const result = parseCookies('name1=value1;  name2=value2  ')
    expect(result).toEqual({
      name1: 'value1',
      name2: 'value2',
    })
  })

  it('returns empty object for undefined header', () => {
    const result = parseCookies(undefined)
    expect(result).toEqual({})
  })

  it('returns empty object for empty string', () => {
    const result = parseCookies('')
    expect(result).toEqual({})
  })

  it('handles single cookie without semicolon', () => {
    const result = parseCookies('token=abc123')
    expect(result).toEqual({ token: 'abc123' })
  })

  it('handles special characters in values', () => {
    const result = parseCookies('data=%7B%22key%22%3A%22value%22%7D')
    expect(result.data).toBe('{"key":"value"}')
  })

  it('handles empty values', () => {
    const result = parseCookies('name1=; name2=value2')
    expect(result).toEqual({
      name1: '',
      name2: 'value2',
    })
  })
})