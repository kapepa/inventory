import { describe, it, expect, vi, beforeEach } from 'vitest'
import { requestUploadAvatar } from '../avatar-api'
import { axiosClient } from '@/shared/lib/axios/client'
import { ForbiddenError } from '@/shared/lib/errors'
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

describe('Upload Avatar API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(isCancel).mockReturnValue(false)
  })

  const mockData = {
    userId: 'user-123',
    image: 'https://cdn.example.com/avatar.jpg',
  }
  const mockSignal = new AbortController().signal

  it('successfully uploads avatar', async () => {
    const mockResponse = { imageUrl: 'https://cdn.example.com/avatar.jpg' }
    vi.mocked(axiosClient.patch).mockResolvedValue({ data: mockResponse })

    const result = await requestUploadAvatar({ data: mockData, signal: mockSignal })

    expect(result).toEqual(mockResponse)
  })

  it('returns imageUrl', async () => {
    const mockResponse = { imageUrl: 'https://cdn.example.com/new-avatar.png' }
    vi.mocked(axiosClient.patch).mockResolvedValue({ data: mockResponse })

    const result = await requestUploadAvatar({ data: mockData, signal: mockSignal })

    expect(result.imageUrl).toBe('https://cdn.example.com/new-avatar.png')
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

    await expect(requestUploadAvatar({ data: mockData, signal: mockSignal }))
      .rejects.toThrow(ForbiddenError)
  })

  it('throws error when request is cancelled', async () => {
    const cancelError = new Error('canceled')
    vi.mocked(isCancel).mockReturnValue(true)
    vi.mocked(axiosClient.patch).mockRejectedValue(cancelError)

    await expect(requestUploadAvatar({ data: mockData, signal: mockSignal }))
      .rejects.toThrow('Request cancelled')
  })

  it('calls correct endpoint', async () => {
    vi.mocked(axiosClient.patch).mockResolvedValue({ data: {} })

    await requestUploadAvatar({ data: mockData, signal: mockSignal })

    expect(axiosClient.patch).toHaveBeenCalledWith(
      '/users/avatar',
      mockData,
      { signal: mockSignal }
    )
  })

  it('uses PATCH method', async () => {
    vi.mocked(axiosClient.patch).mockResolvedValue({ data: {} })

    await requestUploadAvatar({ data: mockData, signal: mockSignal })

    expect(axiosClient.patch).toHaveBeenCalled()
  })

  it('sends data object', async () => {
    vi.mocked(axiosClient.patch).mockResolvedValue({ data: {} })

    await requestUploadAvatar({ data: mockData, signal: mockSignal })

    expect(axiosClient.patch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        userId: expect.any(String),
        image: expect.any(String),
      }),
      expect.any(Object)
    )
  })

  it('passes abort signal to axios', async () => {
    vi.mocked(axiosClient.patch).mockResolvedValue({ data: {} })
    const customSignal = new AbortController().signal

    await requestUploadAvatar({ data: mockData, signal: customSignal })

    expect(axiosClient.patch).toHaveBeenCalledWith(
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
    vi.mocked(axiosClient.patch).mockRejectedValue(error)

    await expect(requestUploadAvatar({ data: mockData, signal: mockSignal }))
      .rejects.toThrow('Something went wrong requestUploadAvatar')
  })
})
