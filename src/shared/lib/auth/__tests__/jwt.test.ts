/**
 * @vitest-environment node
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { signToken, verifyToken, type JwtPayload } from '../jwt'

describe('JWT Utils', () => {
  const mockPayload: JwtPayload = {
    userId: '123',
    email: 'test@example.com',
    role: 'user',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('signToken', () => {
    it('creates a valid JWT token', async () => {
      const token = await signToken(mockPayload)
      expect(token).toBeTruthy()
      expect(typeof token).toBe('string')
      expect(token.split('.')).toHaveLength(3) // JWT has 3 parts
    })

    it('includes payload data in token', async () => {
      const token = await signToken(mockPayload)
      const verified = await verifyToken(token)

      expect(verified).toBeTruthy()
      expect(verified?.userId).toBe(mockPayload.userId)
      expect(verified?.email).toBe(mockPayload.email)
      expect(verified?.role).toBe(mockPayload.role)
    })

    it('creates different tokens for different payloads', async () => {
      const token1 = await signToken(mockPayload)
      const token2 = await signToken({ ...mockPayload, userId: '456' })

      expect(token1).not.toBe(token2)
    })
  })

  describe('verifyToken', () => {
    it('verifies valid token', async () => {
      const token = await signToken(mockPayload)
      const result = await verifyToken(token)

      expect(result).not.toBeNull()
      expect(result?.userId).toBe('123')
    })

    it('returns null for empty string', async () => {
      const result = await verifyToken('')
      expect(result).toBeNull()
    })

    it('returns null for whitespace-only string', async () => {
      const result = await verifyToken('   ')
      expect(result).toBeNull()
    })

    it('returns null for invalid token', async () => {
      const result = await verifyToken('invalid.token.here')
      expect(result).toBeNull()
    })

    it('returns null for malformed token', async () => {
      const result = await verifyToken('not-a-jwt')
      expect(result).toBeNull()
    })

    it('returns null for token with wrong signature', async () => {
      const token = await signToken(mockPayload)
      const tamperedToken = token.slice(0, -5) + 'XXXXX'
      const result = await verifyToken(tamperedToken)

      expect(result).toBeNull()
    })
  })
})