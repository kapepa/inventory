import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  authLogin,
  authRegister,
  authorizeRequest,
  getSessionUser,
  validateEmailForResend,
  activateUserByEmail,
} from '../auth-service'
import { prisma } from '@/shared/lib/prisma'
import {
  AlreadyExistsError,
  InvalidCredentialsError,
  NotFoundError,
  NotVerifiedError,
} from '@/shared/lib/server'
import { hashPassword, comparePassword, signToken, verifyToken } from '@/shared/lib/auth'
import { cookies } from 'next/headers'
import { COOKIE_KEYS } from '@/shared/constants/cookies'

vi.mock('@/shared/lib/prisma', () => ({
  prisma: {
    user: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}))

vi.mock('@/shared/lib/auth', () => ({
  hashPassword: vi.fn(),
  comparePassword: vi.fn(),
  signToken: vi.fn(),
  verifyToken: vi.fn(),
}))

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}))

describe('Auth Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('authRegister', () => {
    const validInput = {
      name: 'John Doe',
      email: 'test@example.com',
      password: 'SecurePassword123',
    }

    it('registers new user successfully', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null)
      vi.mocked(hashPassword).mockResolvedValue('hashed_password')
      vi.mocked(prisma.user.create).mockResolvedValue({
        id: '1',
        name: 'John Doe',
        email: 'test@example.com',
        role: 'USER',
        imageUrl: null,
      } as any)

      const result = await authRegister(validInput)

      expect(result).toEqual({
        id: '1',
        name: 'John Doe',
        email: 'test@example.com',
        role: 'USER',
        imageUrl: null,
      })
      expect(hashPassword).toHaveBeenCalledWith('SecurePassword123')
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: 'John Doe',
          email: 'test@example.com',
          password: 'hashed_password',
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          imageUrl: true,
        },
      })
    })

    it('throws AlreadyExistsError when verified user exists', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        verifiedAt: new Date(),
      } as any)

      await expect(authRegister(validInput)).rejects.toThrow(AlreadyExistsError)
      await expect(authRegister(validInput)).rejects.toThrow('User')
      expect(hashPassword).not.toHaveBeenCalled()
      expect(prisma.user.create).not.toHaveBeenCalled()
    })

    it('throws NotVerifiedError when unverified user exists', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        verifiedAt: null,
      } as any)

      await expect(authRegister(validInput)).rejects.toThrow(NotVerifiedError)
      expect(hashPassword).not.toHaveBeenCalled()
      expect(prisma.user.create).not.toHaveBeenCalled()
    })

    it('validates input with server schema', async () => {
      const invalidInput = {
        name: 'J',
        email: 'invalid-email',
        password: '123',
      }

      await expect(authRegister(invalidInput)).rejects.toThrow()
    })

    it('hashes password before storing', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null)
      vi.mocked(hashPassword).mockResolvedValue('hashed_password_123')
      vi.mocked(prisma.user.create).mockResolvedValue({
        id: '1',
        name: 'John Doe',
        email: 'test@example.com',
        role: 'USER',
        imageUrl: null,
      } as any)

      await authRegister(validInput)

      expect(hashPassword).toHaveBeenCalledWith('SecurePassword123')
      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            password: 'hashed_password_123',
          }),
        })
      )
    })

    it('logs and rethrows Prisma errors', async () => {
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => { })
      vi.mocked(prisma.user.findUnique).mockRejectedValue(new Error('DB Error'))

      await expect(authRegister(validInput)).rejects.toThrow('DB Error')
      expect(consoleLogSpy).toHaveBeenCalledWith('Prisma Error in authRegister:', expect.any(Error))

      consoleLogSpy.mockRestore()
    })
  })

  describe('authLogin', () => {
    const validInput = {
      email: 'test@example.com',
      password: 'SecurePassword123',
    }

    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'test@example.com',
      role: 'USER',
      password: 'hashed_password',
      imageUrl: null,
      verifiedAt: new Date(),
    }

    it('logs in user successfully', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(comparePassword).mockResolvedValue(true)
      vi.mocked(signToken).mockResolvedValue('jwt_token_123')

      const result = await authLogin(validInput)

      expect(result).toEqual({
        user: {
          id: '1',
          name: 'John Doe',
          email: 'test@example.com',
          role: 'USER',
          imageUrl: null,
        },
        token: 'jwt_token_123',
      })
      expect(comparePassword).toHaveBeenCalledWith('SecurePassword123', 'hashed_password')
      expect(signToken).toHaveBeenCalledWith({
        userId: '1',
        email: 'test@example.com',
        role: 'USER',
      })
    })

    it('throws NotFoundError when user does not exist', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null)

      await expect(authLogin(validInput)).rejects.toThrow(NotFoundError)
      await expect(authLogin(validInput)).rejects.toThrow('Email')
      expect(comparePassword).not.toHaveBeenCalled()
      expect(signToken).not.toHaveBeenCalled()
    })

    it('throws InvalidCredentialsError when password is wrong', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(comparePassword).mockResolvedValue(false)

      await expect(authLogin(validInput)).rejects.toThrow(InvalidCredentialsError)
      expect(signToken).not.toHaveBeenCalled()
    })

    it('throws NotVerifiedError when user is not verified', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        ...mockUser,
        verifiedAt: null,
      } as any)
      vi.mocked(comparePassword).mockResolvedValue(true)

      await expect(authLogin(validInput)).rejects.toThrow(NotVerifiedError)
      expect(signToken).not.toHaveBeenCalled()
    })

    it('does not return password in response', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(comparePassword).mockResolvedValue(true)
      vi.mocked(signToken).mockResolvedValue('jwt_token')

      const result = await authLogin(validInput)

      expect(result.user).not.toHaveProperty('password')
      expect(result.user).not.toHaveProperty('verifiedAt')
    })

    it('validates input with server schema', async () => {
      const invalidInput = {
        email: 'not-an-email',
        password: '12',
      }

      await expect(authLogin(invalidInput)).rejects.toThrow()
    })
  })

  describe('getSessionUser', () => {
    it('returns user when valid token exists', async () => {
      const mockCookieStore = {
        get: vi.fn().mockReturnValue({ value: 'valid_token' }),
      }
      vi.mocked(cookies).mockResolvedValue(mockCookieStore as any)
      vi.mocked(verifyToken).mockResolvedValue({
        userId: '1',
        email: 'test@example.com',
        role: 'USER',
      })
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: '1',
        name: 'John Doe',
        email: 'test@example.com',
        role: 'USER',
        imageUrl: null,
        createdAt: new Date(),
      } as any)

      const result = await getSessionUser()

      expect(result).toEqual({
        id: '1',
        name: 'John Doe',
        email: 'test@example.com',
        role: 'USER',
        imageUrl: null,
        createdAt: expect.any(Date),
      })
      expect(mockCookieStore.get).toHaveBeenCalledWith(COOKIE_KEYS.AUTH_TOKEN)
      expect(verifyToken).toHaveBeenCalledWith('valid_token')
    })

    it('returns null when no token exists', async () => {
      const mockCookieStore = {
        get: vi.fn().mockReturnValue(undefined),
      }
      vi.mocked(cookies).mockResolvedValue(mockCookieStore as any)

      const result = await getSessionUser()

      expect(result).toBeNull()
      expect(verifyToken).not.toHaveBeenCalled()
      expect(prisma.user.findUnique).not.toHaveBeenCalled()
    })

    it('returns null when token is invalid', async () => {
      const mockCookieStore = {
        get: vi.fn().mockReturnValue({ value: 'invalid_token' }),
      }
      vi.mocked(cookies).mockResolvedValue(mockCookieStore as any)
      vi.mocked(verifyToken).mockResolvedValue(null)

      const result = await getSessionUser()

      expect(result).toBeNull()
      expect(prisma.user.findUnique).not.toHaveBeenCalled()
    })

    it('returns null when user not found in database', async () => {
      const mockCookieStore = {
        get: vi.fn().mockReturnValue({ value: 'valid_token' }),
      }
      vi.mocked(cookies).mockResolvedValue(mockCookieStore as any)
      vi.mocked(verifyToken).mockResolvedValue({
        userId: '1',
        email: 'test@example.com',
        role: 'USER',
      })
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null)

      const result = await getSessionUser()

      expect(result).toBeNull()
    })

    it('returns null and logs error on exception', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

      vi.mocked(cookies).mockRejectedValue(new Error('Cookie error'))

      const result = await getSessionUser()

      expect(result).toBeNull()
      expect(consoleErrorSpy).toHaveBeenCalledWith('Get session user error:', expect.any(Error))

      consoleErrorSpy.mockRestore()
    })
  })

  describe('authorizeRequest', () => {
    it('finds user by id', async () => {
      vi.mocked(prisma.user.findFirst).mockResolvedValue({
        id: '1',
        name: 'John Doe',
        email: 'test@example.com',
        role: 'USER',
        imageUrl: null,
      } as any)

      const result = await authorizeRequest({ id: '1' })

      expect(result).toEqual({
        id: '1',
        name: 'John Doe',
        email: 'test@example.com',
        role: 'USER',
        imageUrl: null,
      })
      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: {
          OR: [{ id: '1' }, { email: undefined }],
          verifiedAt: { not: null },
        },
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
          imageUrl: true,
        },
      })
    })

    it('finds user by email', async () => {
      vi.mocked(prisma.user.findFirst).mockResolvedValue({
        id: '1',
        name: 'John Doe',
        email: 'test@example.com',
        role: 'USER',
        imageUrl: null,
      } as any)

      const result = await authorizeRequest({ email: 'test@example.com' })

      expect(result).not.toBeNull()
      expect(result?.email).toBe('test@example.com')
    })

    it('only returns verified users', async () => {
      vi.mocked(prisma.user.findFirst).mockResolvedValue(null)

      const result = await authorizeRequest({ id: '1' })

      expect(result).toBeNull()
      expect(prisma.user.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            verifiedAt: { not: null },
          }),
        })
      )
    })

    it('logs and rethrows Prisma errors', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
      vi.mocked(prisma.user.findFirst).mockRejectedValue(new Error('DB Error'))

      await expect(authorizeRequest({ id: '1' })).rejects.toThrow('DB Error')
      expect(consoleErrorSpy).toHaveBeenCalledWith('Prisma Error in authorizeRequest:', expect.any(Error))

      consoleErrorSpy.mockRestore()
    })
  })

  describe('validateEmailForResend', () => {
    it('finds unverified user successfully', async () => {
      vi.mocked(prisma.user.findFirst).mockResolvedValue({
        id: '1',
        name: 'John Doe',
        email: 'test@example.com',
        role: 'USER',
        imageUrl: null,
      } as any)

      const result = await validateEmailForResend({ email: 'test@example.com' })

      expect(result).toEqual({
        id: '1',
        name: 'John Doe',
        email: 'test@example.com',
        role: 'USER',
        imageUrl: null,
      })
      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { email: 'test@example.com', verifiedAt: null },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          imageUrl: true,
        },
      })
    })

    it('throws NotFoundError when user not found', async () => {
      vi.mocked(prisma.user.findFirst).mockResolvedValue(null)

      await expect(validateEmailForResend({ email: 'test@example.com' })).rejects.toThrow(NotFoundError)
      await expect(validateEmailForResend({ email: 'test@example.com' })).rejects.toThrow('Unverified user')
    })

    it('validates input with server schema', async () => {
      await expect(validateEmailForResend({ email: 'not-email' })).rejects.toThrow()
    })
  })

  describe('activateUserByEmail', () => {
    it('activates user successfully', async () => {
      vi.mocked(prisma.user.update).mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        verifiedAt: new Date(),
      } as any)

      await activateUserByEmail('test@example.com')

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        data: { verifiedAt: expect.any(Date) },
      })
    })

    it('logs and rethrows Prisma errors', async () => {
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => { })
      vi.mocked(prisma.user.update).mockRejectedValue(new Error('DB Error'))

      await expect(activateUserByEmail('test@example.com')).rejects.toThrow('DB Error')
      expect(consoleLogSpy).toHaveBeenCalledWith('Prisma Error in activateUserByEmail:', expect.any(Error))

      consoleLogSpy.mockRestore()
    })
  })
})