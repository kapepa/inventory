import { describe, it, expect, vi, beforeEach } from 'vitest'
import { requestVerifyCodeEmail } from '../verify-email-api'
import { axiosClient } from '@/shared/lib/axios/client'
import { NotFoundError } from '@/shared/lib/errors'
import { AxiosError, isCancel } from 'axios'

vi.mock('@/shared/lib/axios/client', () => ({
  axiosClient: {
    post: vi.fn(),
  },
}))

vi.mock('axios', async () => {
  const actual = await vi.importActual('axios')
  return {
    ...actual,
    isCancel: vi.fn(),
  }
})

describe('Verify Email API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(isCancel).mockReturnValue(false)
  })

  const validData = {
    email: 'test@example.com',
    token: 'valid-token-123',
    code: '1234',
  }

  const mockSignal = new AbortController().signal

  it('successfully verifies email', async () => {
    vi.mocked(axiosClient.post).mockResolvedValue({ data: undefined })

    await requestVerifyCodeEmail({ data: validData, signal: mockSignal })

    expect(axiosClient.post).toHaveBeenCalled()
  })

  it('throws NotFoundError on 404', async () => {
    const error = new AxiosError('Not Found', '404', undefined, undefined, {
      status: 404,
      data: {},
      statusText: 'Not Found',
      headers: {},
      config: {} as any,
    })
    vi.mocked(axiosClient.post).mockRejectedValue(error)

    await expect(requestVerifyCodeEmail({ data: validData, signal: mockSignal }))
      .rejects.toThrow(NotFoundError)
  })

  it('throws error when request is cancelled', async () => {
    const cancelError = new Error('canceled')
    vi.mocked(isCancel).mockReturnValue(true)
    vi.mocked(axiosClient.post).mockRejectedValue(cancelError)

    await expect(requestVerifyCodeEmail({ data: validData, signal: mockSignal }))
      .rejects.toThrow('Request cancelled')
  })

  it('calls correct endpoint', async () => {
    vi.mocked(axiosClient.post).mockResolvedValue({ data: undefined })

    await requestVerifyCodeEmail({ data: validData, signal: mockSignal })

    expect(axiosClient.post).toHaveBeenCalledWith(
      '/auth/verify-email',
      validData,
      { signal: mockSignal }
    )
  })

  it('uses POST method', async () => {
    vi.mocked(axiosClient.post).mockResolvedValue({ data: undefined })

    await requestVerifyCodeEmail({ data: validData, signal: mockSignal })

    expect(axiosClient.post).toHaveBeenCalled()
  })

  it('passes abort signal to axios', async () => {
    vi.mocked(axiosClient.post).mockResolvedValue({ data: undefined })
    const customSignal = new AbortController().signal

    await requestVerifyCodeEmail({ data: validData, signal: customSignal })

    expect(axiosClient.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object),
      { signal: customSignal }
    )
  })

  it('uses default error message when response has no error', async () => {
    const error = new AxiosError('Server Error', '500', undefined, undefined, {
      status: 500,
      data: {},
      statusText: 'Internal Server Error',
      headers: {},
      config: {} as any,
    })
    vi.mocked(axiosClient.post).mockRejectedValue(error)

    await expect(requestVerifyCodeEmail({ data: validData, signal: mockSignal }))
      .rejects.toThrow('Something went wrong requestVerifyEmail')
  })
})