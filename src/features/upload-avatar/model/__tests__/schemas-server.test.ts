import { describe, it, expect } from 'vitest'
import { avatarUploadServerSchema } from '../schemas-server'
import { VALIDATION_LIMITS } from '@/shared/constants/validation'

describe('Upload Avatar Server Schema', () => {
  describe('avatarUploadServerSchema', () => {
    const validData = {
      userId: 'user-123',
      image: 'https://example.com/avatar.jpg',
    }

    it('validates correct avatar data', () => {
      const result = avatarUploadServerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('accepts valid URL', () => {
      const data = {
        ...validData,
        image: 'https://cdn.example.com/images/avatar.png',
      }

      const result = avatarUploadServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects empty userId', () => {
      const data = {
        ...validData,
        userId: '',
      }

      const result = avatarUploadServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects userId exceeding max length', () => {
      const longId = 'a'.repeat(VALIDATION_LIMITS.ID_MAX_LENGTH + 1)
      const data = {
        ...validData,
        userId: longId,
      }

      const result = avatarUploadServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects empty avatar', () => {
      const data = {
        ...validData,
        image: '',
      }

      const result = avatarUploadServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects missing userId', () => {
      const data = { image: 'https://example.com/avatar.jpg' }

      const result = avatarUploadServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects missing avatar', () => {
      const data = { userId: 'user-123' }

      const result = avatarUploadServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects non-string userId', () => {
      const data = {
        ...validData,
        userId: 12345,
      }

      const result = avatarUploadServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('rejects non-string avatar', () => {
      const data = {
        ...validData,
        image: 12345,
      }

      const result = avatarUploadServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('rejects missing required fields', () => {
      const fields = ['userId', 'image']

      fields.forEach(field => {
        const data = { ...validData }
        delete (data as any)[field]

        const result = avatarUploadServerSchema.safeParse(data)
        expect(result.success).toBe(false)
      })
    })
  })
})