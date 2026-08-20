import { describe, it, expect, vi, beforeEach } from 'vitest'
import { requestDeleteCategory } from '../category-api'
import { axiosClient } from '@/shared/lib/axios/client'
import { ForbiddenError, NotFoundError } from '@/shared/lib/errors'
import { AxiosError, isCancel } from 'axios'

vi.mock('@/shared/lib/axios/client', () => ({
  axiosClient: {
    delete: vi.fn(),
  },
}))

vi.mock('axios', async () => {
  const actual = await vi.importActual('axios')
  return {
    ...actual,
    isCancel: vi.fn(),
  }
})

describe('Delete Category API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(isCancel).mockReturnValue(false)
  })

  const mockCategory = {
    id: 'category-123',
    serialNumber: 'SN-12345',
  }

  const mockSignal = new AbortController().signal

  it('successfully deletes category', async () => {
    vi.mocked(axiosClient.delete).mockResolvedValue({ data: mockCategory })

    const result = await requestDeleteCategory({ id: 'category-123', signal: mockSignal })

    expect(result).toEqual(mockCategory)
  })

  it('returns deleted category data', async () => {
    vi.mocked(axiosClient.delete).mockResolvedValue({ data: mockCategory })

    const result = await requestDeleteCategory({ id: 'category-123', signal: mockSignal })

    expect(result).toBeDefined()
    expect(result.id).toBe('category-123')
  })

  it('throws ForbiddenError on 403', async () => {
    const error = new AxiosError('Forbidden', '403', undefined, undefined, {
      status: 403,
      data: {},
      statusText: 'Forbidden',
      headers: {},
      config: {} as any,
    })
    vi.mocked(axiosClient.delete).mockRejectedValue(error)

    await expect(requestDeleteCategory({ id: 'category-123', signal: mockSignal }))
      .rejects.toThrow(ForbiddenError)
  })

  it('throws NotFoundError on 404', async () => {
    const error = new AxiosError('Not Found', '404', undefined, undefined, {
      status: 404,
      data: {},
      statusText: 'Not Found',
      headers: {},
      config: {} as any,
    })
    vi.mocked(axiosClient.delete).mockRejectedValue(error)

    await expect(requestDeleteCategory({ id: 'category-123', signal: mockSignal }))
      .rejects.toThrow(NotFoundError)
  })

  it('throws generic error on other status codes', async () => {
    const error = new AxiosError('Server Error', '500', undefined, undefined, {
      status: 500,
      data: { error: 'Internal server error' },
      statusText: 'Internal Server Error',
      headers: {},
      config: {} as any,
    })
    vi.mocked(axiosClient.delete).mockRejectedValue(error)

    await expect(requestDeleteCategory({ id: 'category-123', signal: mockSignal }))
      .rejects.toThrow('Internal server error')
  })

  it('throws error when request is cancelled', async () => {
    const cancelError = new Error('canceled')
    vi.mocked(isCancel).mockReturnValue(true)
    vi.mocked(axiosClient.delete).mockRejectedValue(cancelError)

    await expect(requestDeleteCategory({ id: 'category-123', signal: mockSignal }))
      .rejects.toThrow('Request cancelled')
  })

  it('calls correct endpoint', async () => {
    vi.mocked(axiosClient.delete).mockResolvedValue({ data: mockCategory })

    await requestDeleteCategory({ id: 'category-123', signal: mockSignal })

    expect(axiosClient.delete).toHaveBeenCalledWith('/categories/category-123', { signal: mockSignal })
  })

  it('uses DELETE method', async () => {
    vi.mocked(axiosClient.delete).mockResolvedValue({ data: mockCategory })

    await requestDeleteCategory({ id: 'category-123', signal: mockSignal })

    expect(axiosClient.delete).toHaveBeenCalled()
  })

  it('passes id in URL', async () => {
    vi.mocked(axiosClient.delete).mockResolvedValue({ data: mockCategory })

    await requestDeleteCategory({ id: 'test-id-456', signal: mockSignal })

    expect(axiosClient.delete).toHaveBeenCalledWith(
      expect.stringContaining('test-id-456'),
      expect.any(Object)
    )
  })

  it('passes abort signal to axios', async () => {
    vi.mocked(axiosClient.delete).mockResolvedValue({ data: mockCategory })
    const customSignal = new AbortController().signal

    await requestDeleteCategory({ id: 'category-123', signal: customSignal })

    expect(axiosClient.delete).toHaveBeenCalledWith(
      expect.any(String),
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
    vi.mocked(axiosClient.delete).mockRejectedValue(error)

    await expect(requestDeleteCategory({ id: 'category-123', signal: mockSignal }))
      .rejects.toThrow('Failed to delete category')
  })
})