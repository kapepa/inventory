import { describe, it, expect } from 'vitest'
import {
  registerFormServerSchema,
  loginFormServerSchema,
  resendVerificationServerSchema,
} from '../schemas-server'
import { VALIDATION_LIMITS } from '@/shared/constants/validation'

describe('Auth Server Schemas', () => {
  describe('registerFormServerSchema', () => {
    const validData = {
      name: 'John Doe',
      email: 'test@example.com',
      password: 'SecurePassword123',
    }

    it('validates correct registration data', () => {
      const result = registerFormServerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('trims whitespace from name', () => {
      const data = {
        ...validData,
        name: '  John Doe  ',
      }

      const result = registerFormServerSchema.parse(data)
      expect(result.name).toBe('John Doe')
    })

    it('trims and lowercases email', () => {
      const data = {
        ...validData,
        email: 'Test@Example.COM',
      }

      const result = registerFormServerSchema.parse(data)
      expect(result.email).toBe('test@example.com')
    })

    it('rejects name shorter than minimum', () => {
      const shortName = 'a'.repeat(VALIDATION_LIMITS.NAME_MIN_LENGTH - 1)
      const data = {
        ...validData,
        name: shortName,
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects name longer than maximum', () => {
      const longName = 'a'.repeat(VALIDATION_LIMITS.NAME_MAX_LENGTH + 1)
      const data = {
        ...validData,
        name: longName,
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts name at minimum length', () => {
      const minName = 'a'.repeat(VALIDATION_LIMITS.NAME_MIN_LENGTH)
      const data = {
        ...validData,
        name: minName,
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts name at maximum length', () => {
      const maxName = 'a'.repeat(VALIDATION_LIMITS.NAME_MAX_LENGTH)
      const data = {
        ...validData,
        name: maxName,
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects invalid email format', () => {
      const data = {
        ...validData,
        email: 'not-an-email',
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects email shorter than minimum', () => {
      const shortEmail = 'a@b.c'
      const data = {
        ...validData,
        email: shortEmail,
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects email longer than maximum', () => {
      const longEmail = 'a'.repeat(VALIDATION_LIMITS.EMAIL_MAX_LENGTH) + '@example.com'
      const data = {
        ...validData,
        email: longEmail,
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects password shorter than minimum', () => {
      const shortPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH - 1)
      const data = {
        ...validData,
        password: shortPassword,
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects password longer than maximum', () => {
      const longPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH + 1)
      const data = {
        ...validData,
        password: longPassword,
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts password at minimum length', () => {
      const minPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH)
      const data = {
        ...validData,
        password: minPassword,
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts password at maximum length', () => {
      const maxPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH)
      const data = {
        ...validData,
        password: maxPassword,
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('does not trim password', () => {
      const data = {
        ...validData,
        password: '  password123  ',
      }

      const result = registerFormServerSchema.parse(data)
      expect(result.password).toBe('  password123  ')
    })

    it('rejects missing name', () => {
      const data = {
        email: 'test@example.com',
        password: 'password123',
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects missing email', () => {
      const data = {
        name: 'John Doe',
        password: 'password123',
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects missing password', () => {
      const data = {
        name: 'John Doe',
        email: 'test@example.com',
      }

      const result = registerFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts valid emails', () => {
      const validEmails = [
        'test@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'test123@sub.domain.com',
      ]

      validEmails.forEach(email => {
        const data = { ...validData, email }
        const result = registerFormServerSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })

    it('rejects invalid emails', () => {
      const invalidEmails = [
        'not-an-email',
        '@example.com',
        'user@',
        'user @example.com',
        'user@example',
      ]

      invalidEmails.forEach(email => {
        const data = { ...validData, email }
        const result = registerFormServerSchema.safeParse(data)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('loginFormServerSchema', () => {
    const validData = {
      email: 'test@example.com',
      password: 'SecurePassword123',
    }

    it('validates correct login data', () => {
      const result = loginFormServerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('trims and lowercases email', () => {
      const data = {
        ...validData,
        email: 'Test@Example.COM',
      }

      const result = loginFormServerSchema.parse(data)
      expect(result.email).toBe('test@example.com')
    })

    it('rejects invalid email format', () => {
      const data = {
        ...validData,
        email: 'not-an-email',
      }

      const result = loginFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects email shorter than minimum', () => {
      const shortEmail = 'a@b.c'
      const data = {
        ...validData,
        email: shortEmail,
      }

      const result = loginFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects email longer than maximum', () => {
      const longEmail = 'a'.repeat(VALIDATION_LIMITS.EMAIL_MAX_LENGTH) + '@example.com'
      const data = {
        ...validData,
        email: longEmail,
      }

      const result = loginFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects password shorter than minimum', () => {
      const shortPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH - 1)
      const data = {
        ...validData,
        password: shortPassword,
      }

      const result = loginFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects password longer than maximum', () => {
      const longPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH + 1)
      const data = {
        ...validData,
        password: longPassword,
      }

      const result = loginFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('does not trim password', () => {
      const data = {
        ...validData,
        password: '  password123  ',
      }

      const result = loginFormServerSchema.parse(data)
      expect(result.password).toBe('  password123  ')
    })

    it('rejects missing email', () => {
      const data = {
        password: 'password123',
      }

      const result = loginFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects missing password', () => {
      const data = {
        email: 'test@example.com',
      }

      const result = loginFormServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('resendVerificationServerSchema', () => {
    it('validates correct email', () => {
      const data = { email: 'test@example.com' }
      const result = resendVerificationServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('lowercases email', () => {
      const data = { email: 'Test@Example.COM' }
      const result = resendVerificationServerSchema.parse(data)
      expect(result.email).toBe('test@example.com')
    })

    it('rejects invalid email format', () => {
      const data = { email: 'not-an-email' }
      const result = resendVerificationServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects missing email', () => {
      const data = {}
      const result = resendVerificationServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('only requires email field', () => {
      const data = { email: 'test@example.com' }
      const result = resendVerificationServerSchema.safeParse(data)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(Object.keys(result.data)).toEqual(['email'])
      }
    })
  })
})