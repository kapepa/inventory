import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  requestAuthLogin,
  requestAuthRegister,
  requestAuthLogout,
  requestResendVerification,
} from '../auth-api'
import { axiosClient } from '@/shared/lib/axios/client'
import { AxiosError } from 'axios'
import {
  AlreadyExistsError,
  EmailSendError,
  InvalidCredentialsError,
  NotFoundError,
  NotVerifiedError,
} from '@/shared/lib/errors'

vi.mock('@/shared/lib/axios/client', () => ({
  axiosClient: {
    post: vi.fn(),
  },
}))

vi.mock('axios', async () => {
  const actual = await vi.importActual('axios')
  return {
    ...actual,
    isCancel: vi.fn((error) => error.message === 'canceled'),
    AxiosError: (actual as any).AxiosError,
  }
})

describe('Auth API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('requestAuthLogin', () => {
    const mockLoginData = {
      email: 'test@example.com',
      password: 'password123',
    }
    const mockAbortController = new AbortController()

    it('logs in successfully', async () => {
      const mockResponse = {
        data: {
          id: '1',
          name: 'John Doe',
          email: 'test@example.com',
          role: 'USER',
          imageUrl: null,
        },
      }

      vi.mocked(axiosClient.post).mockResolvedValue(mockResponse)

      const result = await requestAuthLogin({
        data: mockLoginData,
        signal: mockAbortController.signal,
      })

      expect(result).toEqual(mockResponse.data)
      expect(axiosClient.post).toHaveBeenCalledWith(
        '/auth/login',
        mockLoginData,
        { signal: mockAbortController.signal }
      )
    })

    it('throws InvalidCredentialsError on 401', async () => {
      const axiosError = new AxiosError(
        'Unauthorized',
        '401',
        undefined,
        undefined,
        {
          status: 401,
          data: { error: 'Invalid credentials' },
          statusText: 'Unauthorized',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestAuthLogin({
          data: mockLoginData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow(InvalidCredentialsError)
    })

    it('throws NotVerifiedError on 403', async () => {
      const axiosError = new AxiosError(
        'Forbidden',
        '403',
        undefined,
        undefined,
        {
          status: 403,
          data: { error: 'Email not verified' },
          statusText: 'Forbidden',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestAuthLogin({
          data: mockLoginData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow(NotVerifiedError)
    })

    it('throws NotFoundError on 404', async () => {
      const axiosError = new AxiosError(
        'Not Found',
        '404',
        undefined,
        undefined,
        {
          status: 404,
          data: { error: 'Email not found' },
          statusText: 'Not Found',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestAuthLogin({
          data: mockLoginData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow(NotFoundError)

      await expect(
        requestAuthLogin({
          data: mockLoginData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Email')
    })

    it('throws error when request is cancelled', async () => {
      const cancelError = new Error('canceled')
      vi.mocked(axiosClient.post).mockRejectedValue(cancelError)

      await expect(
        requestAuthLogin({
          data: mockLoginData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Request cancelled')
    })

    it('throws custom error message from server', async () => {
      const axiosError = new AxiosError(
        'Server Error',
        '500',
        undefined,
        undefined,
        {
          status: 500,
          data: { error: 'Database connection failed' },
          statusText: 'Internal Server Error',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestAuthLogin({
          data: mockLoginData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Database connection failed')
    })

    it('throws default error when server does not provide one', async () => {
      const axiosError = new AxiosError(
        'Server Error',
        '500',
        undefined,
        undefined,
        {
          status: 500,
          data: {},
          statusText: 'Internal Server Error',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestAuthLogin({
          data: mockLoginData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Something went wrong requestAuthLogin')
    })
  })

  describe('requestAuthRegister', () => {
    const mockRegisterData = {
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    }
    const mockAbortController = new AbortController()

    it('registers successfully', async () => {
      const mockResponse = {
        data: 'Registration successful',
      }

      vi.mocked(axiosClient.post).mockResolvedValue(mockResponse)

      const result = await requestAuthRegister({
        data: mockRegisterData,
        signal: mockAbortController.signal,
      })

      expect(result).toBe('Registration successful')
      expect(axiosClient.post).toHaveBeenCalledWith(
        '/auth/register',
        mockRegisterData,
        { signal: mockAbortController.signal }
      )
    })

    it('throws NotVerifiedError on 403', async () => {
      const axiosError = new AxiosError(
        'Forbidden',
        '403',
        undefined,
        undefined,
        {
          status: 403,
          data: { error: 'Email not verified' },
          statusText: 'Forbidden',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestAuthRegister({
          data: mockRegisterData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow(NotVerifiedError)
    })

    it('throws AlreadyExistsError on 409', async () => {
      const axiosError = new AxiosError(
        'Conflict',
        '409',
        undefined,
        undefined,
        {
          status: 409,
          data: { error: 'User already exists' },
          statusText: 'Conflict',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestAuthRegister({
          data: mockRegisterData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow(AlreadyExistsError)

      await expect(
        requestAuthRegister({
          data: mockRegisterData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('User')
    })

    it('throws EmailSendError on 500 with verification email error', async () => {
      const axiosError = new AxiosError(
        'Server Error',
        '500',
        undefined,
        undefined,
        {
          status: 500,
          data: { error: 'Failed to send verification email' },
          statusText: 'Internal Server Error',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestAuthRegister({
          data: mockRegisterData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow(EmailSendError)

      await expect(
        requestAuthRegister({
          data: mockRegisterData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Failed to send verification email')
    })

    it('throws error when request is cancelled', async () => {
      const cancelError = new Error('canceled')
      vi.mocked(axiosClient.post).mockRejectedValue(cancelError)

      await expect(
        requestAuthRegister({
          data: mockRegisterData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Request cancelled')
    })

    it('throws default error when server does not provide one', async () => {
      const axiosError = new AxiosError(
        'Server Error',
        '500',
        undefined,
        undefined,
        {
          status: 500,
          data: {},
          statusText: 'Internal Server Error',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestAuthRegister({
          data: mockRegisterData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Something went wrong requestAuthRegister')
    })
  })

  describe('requestAuthLogout', () => {
    it('logs out successfully', async () => {
      const mockResponse = {
        data: 'Logged out successfully',
      }

      vi.mocked(axiosClient.post).mockResolvedValue(mockResponse)

      const result = await requestAuthLogout()

      expect(result).toBe('Logged out successfully')
      expect(axiosClient.post).toHaveBeenCalledWith('/auth/logout', { signal: undefined })
    })

    it('logs out with signal', async () => {
      const mockResponse = { data: 'Logged out' }
      const signal = new AbortController().signal

      vi.mocked(axiosClient.post).mockResolvedValue(mockResponse)

      await requestAuthLogout(signal)

      expect(axiosClient.post).toHaveBeenCalledWith('/auth/logout', { signal })
    })

    it('throws error on AxiosError', async () => {
      const axiosError = new AxiosError(
        'Server Error',
        '500',
        undefined,
        undefined,
        {
          status: 500,
          data: { error: 'Logout failed' },
          statusText: 'Internal Server Error',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(requestAuthLogout()).rejects.toThrow('Logout failed')
    })

    it('throws default error when server does not provide one', async () => {
      const axiosError = new AxiosError(
        'Server Error',
        '500',
        undefined,
        undefined,
        {
          status: 500,
          data: {},
          statusText: 'Internal Server Error',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(requestAuthLogout()).rejects.toThrow('Something went wrong requestAuthLogout')
    })
  })

  describe('requestResendVerification', () => {
    const mockData = {
      email: 'test@example.com',
    }
    const mockAbortController = new AbortController()

    it('resends verification successfully', async () => {
      const mockResponse = {
        data: 'Verification email sent',
      }

      vi.mocked(axiosClient.post).mockResolvedValue(mockResponse)

      const result = await requestResendVerification({
        data: mockData,
        signal: mockAbortController.signal,
      })

      expect(result).toBe('Verification email sent')
      expect(axiosClient.post).toHaveBeenCalledWith(
        '/auth/resend-verification',
        mockData,
        { signal: mockAbortController.signal }
      )
    })

    it('throws NotFoundError on 404', async () => {
      const axiosError = new AxiosError(
        'Not Found',
        '404',
        undefined,
        undefined,
        {
          status: 404,
          data: { error: 'User not found' },
          statusText: 'Not Found',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestResendVerification({
          data: mockData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow(NotFoundError)

      await expect(
        requestResendVerification({
          data: mockData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Unverified user')
    })

    it('throws EmailSendError on 500 with verification email error', async () => {
      const axiosError = new AxiosError(
        'Server Error',
        '500',
        undefined,
        undefined,
        {
          status: 500,
          data: { error: 'Failed to send verification email' },
          statusText: 'Internal Server Error',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestResendVerification({
          data: mockData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow(EmailSendError)

      await expect(
        requestResendVerification({
          data: mockData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Failed to send verification email')
    })

    it('throws error when request is cancelled', async () => {
      const cancelError = new Error('canceled')
      vi.mocked(axiosClient.post).mockRejectedValue(cancelError)

      await expect(
        requestResendVerification({
          data: mockData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Request cancelled')
    })

    it('throws default error when server does not provide one', async () => {
      const axiosError = new AxiosError(
        'Server Error',
        '500',
        undefined,
        undefined,
        {
          status: 500,
          data: {},
          statusText: 'Internal Server Error',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestResendVerification({
          data: mockData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Something went wrong requestResendVerification')
    })
  })
})