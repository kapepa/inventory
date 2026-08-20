import { describe, it, expect } from 'vitest'
import { hashPassword, comparePassword } from '../password'

describe('Password Utils', () => {
  describe('hashPassword', () => {
    it('hashes password successfully', async () => {
      const password = 'mySecurePassword123'
      const hash = await hashPassword(password)

      expect(hash).toBeTruthy()
      expect(typeof hash).toBe('string')
      expect(hash).not.toBe(password)
    })

    it('creates different hashes for same password', async () => {
      const password = 'samePassword'
      const hash1 = await hashPassword(password)
      const hash2 = await hashPassword(password)

      // bcrypt uses random salt, so hashes should differ
      expect(hash1).not.toBe(hash2)
    })

    it('hash starts with bcrypt prefix', async () => {
      const hash = await hashPassword('test')
      expect(hash).toMatch(/^\$2[aby]\$/)
    })

    it('handles empty string', async () => {
      const hash = await hashPassword('')
      expect(hash).toBeTruthy()
      expect(typeof hash).toBe('string')
    })

    it('handles special characters', async () => {
      const password = 'P@ssw0rd!#$%^&*()'
      const hash = await hashPassword(password)
      expect(hash).toBeTruthy()
    })
  })

  describe('comparePassword', () => {
    it('returns true for correct password', async () => {
      const password = 'correctPassword'
      const hash = await hashPassword(password)
      const isMatch = await comparePassword(password, hash)

      expect(isMatch).toBe(true)
    })

    it('returns false for incorrect password', async () => {
      const password = 'correctPassword'
      const hash = await hashPassword(password)
      const isMatch = await comparePassword('wrongPassword', hash)

      expect(isMatch).toBe(false)
    })

    it('returns false for empty password against hash', async () => {
      const hash = await hashPassword('password')
      const isMatch = await comparePassword('', hash)

      expect(isMatch).toBe(false)
    })

    it('handles case sensitivity', async () => {
      const password = 'Password'
      const hash = await hashPassword(password)
      const isMatch = await comparePassword('password', hash)

      expect(isMatch).toBe(false)
    })

    it('returns false for invalid hash format', async () => {
      const isMatch = await comparePassword('password', 'not-a-valid-hash')
      expect(isMatch).toBe(false)
    })
  })
})