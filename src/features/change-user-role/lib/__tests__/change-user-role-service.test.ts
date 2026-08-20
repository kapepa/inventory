import { describe, it, expect, vi, beforeEach } from 'vitest'
import { changeUserRoleService } from '../change-user-role-service'
import { prisma } from '@/shared/lib/prisma'
import { ForbiddenError, InvalidInputError } from '@/shared/lib/server'
import * as authLib from '@/shared/lib/auth'
import { Role } from '@prisma/client'

vi.mock('@/shared/lib/prisma', () => ({
  prisma: {
    user: {
      update: vi.fn(),
    },
  },
}))

vi.mock('@/shared/lib/auth', () => ({
  signToken: vi.fn(),
}))

describe('Change User Role Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('changeUserRoleService', () => {
    const validBody = {
      userId: 'user-123',
      role: Role.ADMIN,
    }

    const mockUser = {
      id: 'user-123',
      email: 'test@test.com',
      role: Role.USER,
    }

    const mockUpdatedUser = {
      id: 'user-123',
      email: 'test@test.com',
      role: Role.ADMIN,
    }

    it('changes user role successfully', async () => {
      vi.mocked(prisma.user.update).mockResolvedValue(mockUpdatedUser as any)
      vi.mocked(authLib.signToken).mockResolvedValue('new-jwt-token')

      const result = await changeUserRoleService({
        body: validBody as any,
        user: mockUser as any
      })

      expect(result.role).toBe(Role.ADMIN)
      expect(result.token).toBe('new-jwt-token')
    })

    it('returns new role and token', async () => {
      vi.mocked(prisma.user.update).mockResolvedValue(mockUpdatedUser as any)
      vi.mocked(authLib.signToken).mockResolvedValue('jwt-token-123')

      const result = await changeUserRoleService({
        body: validBody as any,
        user: mockUser as any
      })

      expect(result).toHaveProperty('role')
      expect(result).toHaveProperty('token')
      expect(result.token).toBe('jwt-token-123')
    })

    it('throws ForbiddenError when user tries to change another user role', async () => {
      const differentUser = { ...mockUser, id: 'different-user' }

      await expect(
        changeUserRoleService({ body: validBody as any, user: differentUser as any })
      ).rejects.toThrow(ForbiddenError)
    })

    it('only allows user to change their own role', async () => {
      const anotherUserBody = { userId: 'another-user', role: Role.ADMIN }

      await expect(
        changeUserRoleService({ body: anotherUserBody as any, user: mockUser as any })
      ).rejects.toThrow('No access')
    })

    it('throws InvalidInputError when user already has this role', async () => {
      const sameRoleBody = { userId: 'user-123', role: Role.USER }

      await expect(
        changeUserRoleService({ body: sameRoleBody as any, user: mockUser as any })
      ).rejects.toThrow(InvalidInputError)
    })

    it('prevents setting same role twice', async () => {
      const currentRoleBody = { userId: 'user-123', role: Role.USER }

      await expect(
        changeUserRoleService({ body: currentRoleBody as any, user: mockUser as any })
      ).rejects.toThrow('User already has this role')
    })

    it('updates user role in database', async () => {
      vi.mocked(prisma.user.update).mockResolvedValue(mockUpdatedUser as any)
      vi.mocked(authLib.signToken).mockResolvedValue('token')

      await changeUserRoleService({ body: validBody as any, user: mockUser as any })

      expect(prisma.user.update).toHaveBeenCalled()
    })

    it('calls prisma.user.update with correct userId', async () => {
      vi.mocked(prisma.user.update).mockResolvedValue(mockUpdatedUser as any)
      vi.mocked(authLib.signToken).mockResolvedValue('token')

      await changeUserRoleService({ body: validBody as any, user: mockUser as any })

      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'user-123' },
        })
      )
    })

    it('calls prisma.user.update with new role', async () => {
      vi.mocked(prisma.user.update).mockResolvedValue(mockUpdatedUser as any)
      vi.mocked(authLib.signToken).mockResolvedValue('token')

      await changeUserRoleService({ body: validBody as any, user: mockUser as any })

      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { role: Role.ADMIN },
        })
      )
    })

    it('generates new JWT token with updated role', async () => {
      vi.mocked(prisma.user.update).mockResolvedValue(mockUpdatedUser as any)
      vi.mocked(authLib.signToken).mockResolvedValue('new-token')

      await changeUserRoleService({ body: validBody as any, user: mockUser as any })

      expect(authLib.signToken).toHaveBeenCalled()
    })

    it('token contains userId, email, and new role', async () => {
      vi.mocked(prisma.user.update).mockResolvedValue(mockUpdatedUser as any)
      vi.mocked(authLib.signToken).mockResolvedValue('token')

      await changeUserRoleService({ body: validBody as any, user: mockUser as any })

      expect(authLib.signToken).toHaveBeenCalledWith({
        userId: 'user-123',
        email: 'test@test.com',
        role: Role.ADMIN,
      })
    })

    it('validates input with server schema', async () => {
      const invalidBody = { userId: '', role: Role.ADMIN }

      await expect(
        changeUserRoleService({ body: invalidBody as any, user: mockUser as any })
      ).rejects.toThrow()
    })

    it('rejects invalid role', async () => {
      const invalidBody = { userId: 'user-123', role: 'INVALID_ROLE' }

      await expect(
        changeUserRoleService({ body: invalidBody as any, user: mockUser as any })
      ).rejects.toThrow()
    })

    it('logs and rethrows Prisma errors', async () => {
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => { })
      const prismaError = new Error('Database connection failed')

      vi.mocked(prisma.user.update).mockRejectedValue(prismaError)

      await expect(
        changeUserRoleService({ body: validBody as any, user: mockUser as any })
      ).rejects.toThrow('Database connection failed')

      expect(consoleLogSpy).toHaveBeenCalledWith('Error in changeUserRoleService:', prismaError)
      consoleLogSpy.mockRestore()
    })

    it('handles database connection errors', async () => {
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => { })
      const dbError = new Error('Connection timeout')
      vi.mocked(prisma.user.update).mockRejectedValue(dbError)

      await expect(
        changeUserRoleService({ body: validBody as any, user: mockUser as any })
      ).rejects.toThrow('Connection timeout')

      consoleLogSpy.mockRestore()
    })
  })
})