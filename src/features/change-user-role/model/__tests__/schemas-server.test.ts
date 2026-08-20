import { describe, it, expect } from 'vitest'
import { changeUserRoleServerSchema } from '../schemas-server'
import { VALIDATION_LIMITS } from '@/shared/constants/validation'
import { Role } from '@prisma/client'

describe('Change User Role Server Schema', () => {
  describe('changeUserRoleServerSchema', () => {
    const validData = {
      userId: 'user-123',
      role: Role.ADMIN,
    }

    it('validates correct user role data', () => {
      const result = changeUserRoleServerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('rejects empty userId', () => {
      const data = {
        ...validData,
        userId: '',
      }

      const result = changeUserRoleServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects userId exceeding max length', () => {
      const longId = 'a'.repeat(VALIDATION_LIMITS.ID_MAX_LENGTH + 1)
      const data = {
        ...validData,
        userId: longId,
      }

      const result = changeUserRoleServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('accepts userId at max length', () => {
      const maxId = 'a'.repeat(VALIDATION_LIMITS.ID_MAX_LENGTH)
      const data = {
        ...validData,
        userId: maxId,
      }

      const result = changeUserRoleServerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('accepts valid role values', () => {
      const roles = [Role.ADMIN, Role.USER]

      roles.forEach(role => {
        const data = {
          ...validData,
          role,
        }
        const result = changeUserRoleServerSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })

    it('rejects invalid role value', () => {
      const data = {
        ...validData,
        role: 'INVALID_ROLE',
      }

      const result = changeUserRoleServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('rejects empty role', () => {
      const data = {
        ...validData,
        role: '',
      }

      const result = changeUserRoleServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('rejects missing userId', () => {
      const data = { role: Role.ADMIN }

      const result = changeUserRoleServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects missing role', () => {
      const data = { userId: 'user-123' }

      const result = changeUserRoleServerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects non-string userId', () => {
      const data = {
        ...validData,
        userId: 12345,
      }

      const result = changeUserRoleServerSchema.safeParse(data as any)
      expect(result.success).toBe(false)
    })

    it('rejects missing required fields', () => {
      const fields = ['userId', 'role']

      fields.forEach(field => {
        const data = { ...validData }
        delete (data as any)[field]

        const result = changeUserRoleServerSchema.safeParse(data)
        expect(result.success).toBe(false)
      })
    })
  })
})