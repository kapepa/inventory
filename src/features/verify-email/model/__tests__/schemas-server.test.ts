import { describe, it, expect } from 'vitest'
import { codeFormServerSchema } from '../schemas-server'
import { VALIDATION_LIMITS } from '@/shared/constants/validation'

describe('Verify Email Server Schema', () => {
  describe('codeFormServerSchema', () => {
    const validData = {
      email: 'test@example.com',
      token: 'valid-token-123',
      code: '1234',
    }

    it('validates correct verification data', () => {
      const result = codeFormServerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('trims and lowercases email', () => {
      const data = {
        ...validData,
        email: 'TEST@EXAMPLE.COM',
      }

      const result = codeFormServerSchema.parse(data)
      expect(result.email).toBe('test@example.com')
    })

    it('trims token', () => {
      const data = {
        ...validData,
        token: '  token-123  ',
      }

      const result = codeFormServerSchema.parse(data)
      expect(result.token).toBe('token-123')
    })

    it('trims code', () => {
      const data = {
        ...validData,
        code: '  1234  ',
      }

      const result = codeFormServerSchema.parse(data)
      expect(result.code).toBe('1234')
    })

    it('rejects invalid email', () => {
      const data = {
        ...validData,
        email: 'invalid-email',
      }

      const result = codeFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects email shorter than minimum', () => {
      const shortEmail = 'a@b.c'
      const data = {
        ...validData,
        email: shortEmail,
      }

      const result = codeFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects token shorter than minimum', () => {
      const shortToken = ''
      const data = {
        ...validData,
        token: shortToken,
      }

      const result = codeFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects code with incorrect length', () => {
      const data = {
        ...validData,
        code: '12345',
      }

      const result = codeFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts code with exact length', () => {
      const code = '1'.repeat(VALIDATION_LIMITS.CODE_LENGTH)
      const data = {
        ...validData,
        code,
      }

      const result = codeFormServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects empty email', () => {
      const data = {
        ...validData,
        email: '',
      }

      const result = codeFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects empty token', () => {
      const data = {
        ...validData,
        token: '',
      }

      const result = codeFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects empty code', () => {
      const data = {
        ...validData,
        code: '',
      }

      const result = codeFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects missing required fields', () => {
      const fields = ['email', 'token', 'code']

      fields.forEach(field => {
        const data = { ...validData }
        delete (data as any)[field]

        const result = codeFormServerSchema.safeParse(data)
        expect(result.success).toBe(false)
      })
    })
  })
})