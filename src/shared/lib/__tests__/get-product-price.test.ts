import { describe, it, expect } from 'vitest'
import { Money } from '@prisma/client'
import { getProductPrice, getProductPrimaryPrice } from '../get-product-price'

describe('Product Price Utils', () => {
  const mockPrices = [
    { symbol: Money.UAH, value: 1000 },
    { symbol: Money.USD, value: 25 },
  ]

  describe('getProductPrice', () => {
    it('returns price for UAH currency', () => {
      const price = getProductPrice(mockPrices, Money.UAH)
      expect(price).toBe(1000)
    })

    it('returns price for USD currency', () => {
      const price = getProductPrice(mockPrices, Money.USD)
      expect(price).toBe(25)
    })

    it('returns undefined for non-existent currency', () => {
      const price = getProductPrice(mockPrices, 'EUR' as Money)
      expect(price).toBeUndefined()
    })

    it('defaults to UAH when no currency specified', () => {
      const price = getProductPrice(mockPrices)
      expect(price).toBe(1000)
    })

    it('returns undefined for empty prices array', () => {
      const price = getProductPrice([])
      expect(price).toBeUndefined()
    })

    it('handles single price', () => {
      const singlePrice = [{ symbol: Money.USD, value: 50 }]
      const price = getProductPrice(singlePrice, Money.USD)
      expect(price).toBe(50)
    })
  })

  describe('getProductPrimaryPrice', () => {
    it('returns formatted prices for both currencies', () => {
      const result = getProductPrimaryPrice(mockPrices)

      expect(result).toHaveProperty(Money.UAH)
      expect(result).toHaveProperty(Money.USD)
      expect(typeof result[Money.UAH]).toBe('string')
      expect(typeof result[Money.USD]).toBe('string')
    })

    it('returns undefined for missing UAH price', () => {
      const pricesWithoutUAH = [{ symbol: Money.USD, value: 25 }]
      const result = getProductPrimaryPrice(pricesWithoutUAH)

      expect(result[Money.UAH]).toBeUndefined()
      expect(result[Money.USD]).toBeTruthy()
    })

    it('returns undefined for missing USD price', () => {
      const pricesWithoutUSD = [{ symbol: Money.UAH, value: 1000 }]
      const result = getProductPrimaryPrice(pricesWithoutUSD)

      expect(result[Money.UAH]).toBeTruthy()
      expect(result[Money.USD]).toBeUndefined()
    })

    it('handles empty prices array', () => {
      const result = getProductPrimaryPrice([])

      expect(result[Money.UAH]).toBeUndefined()
      expect(result[Money.USD]).toBeUndefined()
    })

    it('formats UAH price correctly', () => {
      const result = getProductPrimaryPrice(mockPrices)
      const uahPrice = result[Money.UAH]

      expect(uahPrice).toContain('1')
      expect(uahPrice).toContain('000')
      expect(uahPrice).toContain('₴')
    })

    it('formats USD price correctly', () => {
      const result = getProductPrimaryPrice(mockPrices)
      const usdPrice = result[Money.USD]

      expect(usdPrice).toContain('25')
      expect(usdPrice).toContain('$')
    })
  })
})