import { describe, it, expect, vi, beforeEach } from 'vitest'
import { validateVerificationCode } from '../validate-verification-code'
import { prisma } from '@/shared/lib/prisma'
import { NotFoundError } from '@/shared/lib/server'

vi.mock('@/shared/lib/prisma', () => ({
  prisma: {
    verificationCode: {
      findFirst: vi.fn(),
    },
  },
}))

describe('Validate Verification Code Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const validInput = {
    email: 'test@example.com',
    token: 'valid-token-123',
    code: '1234',
  }

  const mockVerificationCode = {
    email: 'test@example.com',
    expiresAt: new Date(Date.now() + 3600000),
    user: {
      name: 'Test User',
    },
  }

  it('validates code successfully', async () => {
    vi.mocked(prisma.verificationCode.findFirst).mockResolvedValue(mockVerificationCode as any)

    const result = await validateVerificationCode(validInput)

    expect(result.email).toBe('test@example.com')
    expect(result.name).toBe('Test User')
  })

  it('throws NotFoundError when code not found', async () => {
    vi.mocked(prisma.verificationCode.findFirst).mockResolvedValue(null)

    await expect(validateVerificationCode(validInput))
      .rejects.toThrow(NotFoundError)
  })

  it('throws NotFoundError with correct message', async () => {
    vi.mocked(prisma.verificationCode.findFirst).mockResolvedValue(null)

    await expect(validateVerificationCode(validInput))
      .rejects.toThrow('Verification code')
  })

  it('checks code is not expired', async () => {
    vi.mocked(prisma.verificationCode.findFirst).mockResolvedValue(mockVerificationCode as any)

    await validateVerificationCode(validInput)

    expect(prisma.verificationCode.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          expiresAt: { gt: expect.any(Date) },
        }),
      })
    )
  })

  it('validates with correct code, email, and token', async () => {
    vi.mocked(prisma.verificationCode.findFirst).mockResolvedValue(mockVerificationCode as any)

    await validateVerificationCode(validInput)

    expect(prisma.verificationCode.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          code: '1234',
          email: 'test@example.com',
          token: 'valid-token-123',
          expiresAt: { gt: expect.any(Date) },
        },
      })
    )
  })

  it('validates input with server schema', async () => {
    const invalidInput = {
      email: 'invalid',
      token: 'token',
      code: '1234',
    }

    await expect(validateVerificationCode(invalidInput))
      .rejects.toThrow()
  })

  it('handles database errors', async () => {
    const dbError = new Error('Database error')
    vi.mocked(prisma.verificationCode.findFirst).mockRejectedValue(dbError)

    await expect(validateVerificationCode(validInput))
      .rejects.toThrow('Database error')
  })

  it('logs and rethrows Prisma errors', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
    const prismaError = new Error('Connection failed')

    vi.mocked(prisma.verificationCode.findFirst).mockRejectedValue(prismaError)

    await expect(validateVerificationCode(validInput))
      .rejects.toThrow('Connection failed')

    expect(consoleErrorSpy).toHaveBeenCalledWith('Prisma Error in validateVerificationCode:', prismaError)
    consoleErrorSpy.mockRestore()
  })

  it('returns user name from nested user object', async () => {
    const codeWithUser = {
      ...mockVerificationCode,
      user: { name: 'John Doe' },
    }
    vi.mocked(prisma.verificationCode.findFirst).mockResolvedValue(codeWithUser as any)

    const result = await validateVerificationCode(validInput)

    expect(result.name).toBe('John Doe')
  })
})