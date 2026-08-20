import { describe, it, expect, vi, beforeEach } from 'vitest'
import { requestChangeUserRole } from '../change-user-role-api'
import { axiosClient } from '@/shared/lib/axios/client'
import { ForbiddenError, InvalidInputError } from '@/shared/lib/errors'
import { AxiosError, isCancel } from 'axios'
import { Role } from '@prisma/client'

vi.mock('@/shared/lib/axios/client', () => ({
  axiosClient: {
    patch: vi.fn(),
  },
}))

vi.mock('axios', async () => {
  const actual = await vi.importActual('axios')
  return {
    ...actual,
    isCancel: vi.fn(),
  }
})

describe('Change User Role API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(isCancel).mockReturnValue(false)
  })

  const validData = {
    userId: 'user-123',
    role: Role.ADMIN,
  }

  const mockSignal = new AbortController().signal

  describe('requestChangeUserRole', () => {
    it('successfully changes user role', async () => {
      const mockResponse = { role: Role.ADMIN, token: 'jwt-token' }
      vi.mocked(axiosClient.patch).mockResolvedValue({ data: mockResponse })

      const result = await requestChangeUserRole({ signal: mockSignal, data: validData })

      expect(result).toEqual(mockResponse)
    })

    it('returns response data with role and token', async () => {
      const mockResponse = { role: Role.USER, token: 'new-token-123' }
      vi.mocked(axiosClient.patch).mockResolvedValue({ data: mockResponse })

      const result = await requestChangeUserRole({ signal: mockSignal, data: validData })

      expect(result).toBeDefined()
      expect((result as any).role).toBe(Role.USER)
      expect((result as any).token).toBe('new-token-123')
    })

    it('throws InvalidInputError on 400', async () => {
      const error = new AxiosError('Bad Request', '400', undefined, undefined, {
        status: 400,
        data: {},
        statusText: 'Bad Request',
        headers: {},
        config: {} as any,
      })
      vi.mocked(axiosClient.patch).mockRejectedValue(error)

      await expect(requestChangeUserRole({ signal: mockSignal, data: validData }))
        .rejects.toThrow(InvalidInputError)
    })

    it('throws ForbiddenError on 403', async () => {
      const error = new AxiosError('Forbidden', '403', undefined, undefined, {
        status: 403,
        data: {},
        statusText: 'Forbidden',
        headers: {},
        config: {} as any,
      })
      vi.mocked(axiosClient.patch).mockRejectedValue(error)

      await expect(requestChangeUserRole({ signal: mockSignal, data: validData }))
        .rejects.toThrow(ForbiddenError)
    })

    it('throws generic error on other status codes', async () => {
      const error = new AxiosError('Server Error', '500', undefined, undefined, {
        status: 500,
        data: { error: 'Internal server error' },
        statusText: 'Internal Server Error',
        headers: {},
        config: {} as any,
      })
      vi.mocked(axiosClient.patch).mockRejectedValue(error)

      await expect(requestChangeUserRole({ signal: mockSignal, data: validData }))
        .rejects.toThrow('Internal server error')
    })

    it('throws error when request is cancelled', async () => {
      const cancelError = new Error('canceled')
      vi.mocked(isCancel).mockReturnValue(true)
      vi.mocked(axiosClient.patch).mockRejectedValue(cancelError)

      await expect(requestChangeUserRole({ signal: mockSignal, data: validData }))
        .rejects.toThrow('Request cancelled')
    })

    it('calls correct endpoint', async () => {
      vi.mocked(axiosClient.patch).mockResolvedValue({ data: {} })

      await requestChangeUserRole({ signal: mockSignal, data: validData })

      expect(axiosClient.patch).toHaveBeenCalledWith(
        '/users/role',
        validData,
        { signal: mockSignal }
      )
    })

    it('uses PATCH method', async () => {
      vi.mocked(axiosClient.patch).mockResolvedValue({ data: {} })

      await requestChangeUserRole({ signal: mockSignal, data: validData })

      expect(axiosClient.patch).toHaveBeenCalled()
    })

    it('sends correct data in request body', async () => {
      vi.mocked(axiosClient.patch).mockResolvedValue({ data: {} })

      await requestChangeUserRole({ signal: mockSignal, data: validData })

      expect(axiosClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        validData,
        expect.any(Object)
      )
    })

    it('passes abort signal to axios', async () => {
      vi.mocked(axiosClient.patch).mockResolvedValue({ data: {} })
      const customSignal = new AbortController().signal

      await requestChangeUserRole({ signal: customSignal, data: validData })

      expect(axiosClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        { signal: customSignal }
      )
    })

    it('handles network errors', async () => {
      const networkError = new AxiosError('Network Error')
      networkError.code = 'ERR_NETWORK'
      vi.mocked(axiosClient.patch).mockRejectedValue(networkError)

      await expect(requestChangeUserRole({ signal: mockSignal, data: validData }))
        .rejects.toThrow()
    })

    it('handles timeout errors', async () => {
      const timeoutError = new AxiosError('Timeout')
      timeoutError.code = 'ECONNABORTED'
      vi.mocked(axiosClient.patch).mockRejectedValue(timeoutError)

      await expect(requestChangeUserRole({ signal: mockSignal, data: validData }))
        .rejects.toThrow()
    })

    it('uses default error message when response has no error', async () => {
      const error = new AxiosError('Server Error', '500', undefined, undefined, {
        status: 500,
        data: {},
        statusText: 'Internal Server Error',
        headers: {},
        config: {} as any,
      })
      vi.mocked(axiosClient.patch).mockRejectedValue(error)

      await expect(requestChangeUserRole({ signal: mockSignal, data: validData }))
        .rejects.toThrow('Failed to change user role')
    })
  })
})