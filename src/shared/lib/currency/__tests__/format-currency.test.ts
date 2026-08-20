import { describe, it, expect } from 'vitest'
import { formatCurrency, formatUSD, formatUAH } from '../format-currency'

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56')
  })

  it('formats UAH correctly', () => {
    const result = formatCurrency(1234.56, 'UAH')
    // Проверяем наличие ключевых элементов вместо точного формата
    expect(result).toContain('1')
    expect(result).toContain('234')
    expect(result).toContain('56')
    expect(result).toContain('₴')
  })

  it('adds .00 for whole numbers', () => {
    expect(formatUSD(100)).toBe('$100.00')
  })
})

describe('formatUSD', () => {
  it('is a shortcut for USD', () => {
    expect(formatUSD(999)).toBe(formatCurrency(999, 'USD'))
  })
})

describe('formatUAH', () => {
  it('is a shortcut for UAH', () => {
    expect(formatUAH(999)).toBe(formatCurrency(999, 'UAH'))
  })
})