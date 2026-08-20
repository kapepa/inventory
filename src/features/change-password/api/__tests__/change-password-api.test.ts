import { describe, it, expect, vi, beforeEach } from 'vitest'
import { requestChangePassword } from '../change-password-api'
import { axiosClient } from '@/shared/lib/axios/client'
import { InvalidCredentialsError, InvalidInputError, NotFoundError } from '@/shared/lib/errors'
import { AxiosError, isCancel } from 'axios'

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

describe('Change Password API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(isCancel).mockReturnValue(false)
  })

  const validData = {
    currentPassword: 'OldPass123!',
    newPassword: 'NewPass456!',
  }

  const mockSignal = new AbortController().signal

  describe('requestChangePassword', () => {
    it('successfully changes password', async () => {
      const mockResponse = { message: 'Password changed successfully' }
      vi.mocked(axiosClient.patch).mockResolvedValue({ data: mockResponse })

      const result = await requestChangePassword({ signal: mockSignal, data: validData })

      expect(result).toEqual(mockResponse)
    })

    it('returns response data', async () => {
      const mockResponse = { message: 'Success', userId: '123' }
      vi.mocked(axiosClient.patch).mockResolvedValue({ data: mockResponse })

      const result = await requestChangePassword({ signal: mockSignal, data: validData })

      expect(result).toBeDefined()
    })

    it('throws InvalidCredentialsError on 403', async () => {
      const error = new AxiosError('Forbidden', '403', undefined, undefined, {
        status: 403,
        data: {},
        statusText: 'Forbidden',
        headers: {},
        config: {} as any,
      })
      vi.mocked(axiosClient.patch).mockRejectedValue(error)

      await expect(requestChangePassword({ signal: mockSignal, data: validData }))
        .rejects.toThrow(InvalidCredentialsError)
    })

    it('throws NotFoundError on 404', async () => {
      const error = new AxiosError('Not Found', '404', undefined, undefined, {
        status: 404,
        data: {},
        statusText: 'Not Found',
        headers: {},
        config: {} as any,
      })
      vi.mocked(axiosClient.patch).mockRejectedValue(error)

      await expect(requestChangePassword({ signal: mockSignal, data: validData }))
        .rejects.toThrow(NotFoundError)
    })

    it('throws InvalidInputError on 409', async () => {
      const error = new AxiosError('Conflict', '409', undefined, undefined, {
        status: 409,
        data: {},
        statusText: 'Conflict',
        headers: {},
        config: {} as any,
      })
      vi.mocked(axiosClient.patch).mockRejectedValue(error)

      await expect(requestChangePassword({ signal: mockSignal, data: validData }))
        .rejects.toThrow(InvalidInputError)
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

      await expect(requestChangePassword({ signal: mockSignal, data: validData }))
        .rejects.toThrow('Internal server error')
    })

    it('throws error when request is cancelled', async () => {
      const cancelError = new Error('canceled')
      vi.mocked(isCancel).mockReturnValue(true)
      vi.mocked(axiosClient.patch).mockRejectedValue(cancelError)

      await expect(requestChangePassword({ signal: mockSignal, data: validData }))
        .rejects.toThrow('Request cancelled')
    })

    it('calls correct endpoint', async () => {
      vi.mocked(axiosClient.patch).mockResolvedValue({ data: {} })

      await requestChangePassword({ signal: mockSignal, data: validData })

      expect(axiosClient.patch).toHaveBeenCalledWith(
        '/users/change-password',
        validData,
        { signal: mockSignal }
      )
    })

    it('uses PATCH method', async () => {
      vi.mocked(axiosClient.patch).mockResolvedValue({ data: {} })
      { signal: mockSignal }
    })

    it('uses PATCH method', async () => {
      vi.mocked(axiosClient.patch).mockResolvedValue({ data: {} })

      await requestChangePassword({ signal: mockSignal, data: validData })

      expect(axiosClient.patch).toHaveBeenCalled()
    })

    it('sends correct data in request body', async () => {
      vi.mocked(axiosClient.patch).mockResolvedValue({ data: {} })

      await requestChangePassword({ signal: mockSignal, data: validData })

      expect(axiosClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        validData,
        expect.any(Object)
      )
    })

    it('passes abort signal to axios', async () => {
      vi.mocked(axiosClient.patch).mockResolvedValue({ data: {} })
      const customSignal = new AbortController().signal

      await requestChangePassword({ signal: customSignal, data: validData })

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

      await expect(requestChangePassword({ signal: mockSignal, data: validData }))
        .rejects.toThrow()
    })

    it('handles timeout errors', async () => {
      const timeoutError = new AxiosError('Timeout')
      timeoutError.code = 'ECONNABORTED'
      vi.mocked(axiosClient.patch).mockRejectedValue(timeoutError)

      await expect(requestChangePassword({ signal: mockSignal, data: validData }))
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

      await expect(requestChangePassword({ signal: mockSignal, data: validData }))
        .rejects.toThrow('Failed to change password')
    })
  })
})