import { describe, it, expect } from 'vitest'

import { VALIDATION_LIMITS } from '@/shared/constants/validation'
import { changePasswordServerSchema } from '../schemas-server'

describe('Password Change Server Schema', () => {
  describe('changePasswordServerSchema', () => {
    const validData = {
      currentPassword: 'OldPass123!',
      newPassword: 'NewPass456!',
      userId: 'user-123',
    }

    it('validates correct password data', () => {
      const result = changePasswordServerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('trims whitespace from currentPassword', () => {
      const data = {
        ...validData,
        currentPassword: '  OldPass123!  ',
      }

      const result = changePasswordServerSchema.parse(data)
      expect(result.currentPassword).toBe('OldPass123!')
    })

    it('trims whitespace from newPassword', () => {
      const data = {
        ...validData,
        newPassword: '  NewPass456!  ',
      }

      const result = changePasswordServerSchema.parse(data)
      expect(result.newPassword).toBe('NewPass456!')
    })

    it('rejects currentPassword shorter than minimum', () => {
      const shortPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH - 1)
      const data = {
        ...validData,
        currentPassword: shortPassword,
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects newPassword shorter than minimum', () => {
      const shortPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH - 1)
      const data = {
        ...validData,
        newPassword: shortPassword,
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects currentPassword longer than maximum', () => {
      const longPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH + 1)
      const data = {
        ...validData,
        currentPassword: longPassword,
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects newPassword longer than maximum', () => {
      const longPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH + 1)
      const data = {
        ...validData,
        newPassword: longPassword,
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts currentPassword at minimum length', () => {
      const minPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH)
      const data = {
        ...validData,
        currentPassword: minPassword,
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts currentPassword at maximum length', () => {
      const maxPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH)
      const data = {
        ...validData,
        currentPassword: maxPassword,
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts newPassword at minimum length', () => {
      const minPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH)
      const data = {
        ...validData,
        newPassword: minPassword,
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts newPassword at maximum length', () => {
      const maxPassword = 'a'.repeat(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH)
      const data = {
        ...validData,
        newPassword: maxPassword,
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects when newPassword equals currentPassword', () => {
      const data = {
        ...validData,
        currentPassword: 'SamePass123!',
        newPassword: 'SamePass123!',
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects empty currentPassword', () => {
      const data = {
        ...validData,
        currentPassword: '',
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects empty newPassword', () => {
      const data = {
        ...validData,
        newPassword: '',
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects empty currentPassword after trim', () => {
      const data = {
        ...validData,
        currentPassword: '   ',
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects empty newPassword after trim', () => {
      const data = {
        ...validData,
        newPassword: '   ',
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects empty userId', () => {
      const data = {
        ...validData,
        userId: '',
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects userId exceeding max length', () => {
      const longId = 'a'.repeat(VALIDATION_LIMITS.ID_MAX_LENGTH + 1)
      const data = {
        ...validData,
        userId: longId,
      }

      const result = changePasswordServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects non-string currentPassword', () => {
      const data = {
        ...validData,
        currentPassword: 12345,
      }

      const result = changePasswordServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('rejects non-string newPassword', () => {
      const data = {
        ...validData,
        newPassword: 12345,
      }

      const result = changePasswordServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('rejects missing required fields', () => {
      const fields = ['currentPassword', 'newPassword', 'userId']

      fields.forEach((field) => {
        const data = { ...validData }
        delete (data as any)[field]

        const result = changePasswordServerSchema.safeParse(data)
        expect(result.success).toBe(false)
      })
    })
  })
})