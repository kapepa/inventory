import { describe, it, expect, vi, beforeEach } from 'vitest'
import { requestCreateCategory } from '../category-api'
import { axiosClient } from '@/shared/lib/axios/client'
import { AxiosError } from 'axios'
import { AlreadyExistsError } from '@/shared/lib/errors'

// Mock axios client
vi.mock('@/shared/lib/axios/client', () => ({
  axiosClient: {
    post: vi.fn(),
  },
}))

// Mock axios utilities
vi.mock('axios', async () => {
  const actual = await vi.importActual('axios')
  return {
    ...actual,
    isCancel: vi.fn((error) => error.message === 'canceled'),
    AxiosError: (actual as any).AxiosError,
  }
})

describe('Category API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('requestCreateCategory', () => {
    const mockCategoryData = {
      translations: {
        ru: { locale: 'ru' as const, title: 'Тестовая категория' },
        en: { locale: 'en' as const, title: 'Test Category' },
      },
    }

    const mockAbortController = new AbortController()

    it('successfully creates category', async () => {
      const mockResponse = {
        data: {
          id: '1',
          translations: [
            { id: '1', locale: 'ru', title: 'Тестовая категория', categoryId: '1' },
          ],
          _count: { products: 0 },
        },
      }

      vi.mocked(axiosClient.post).mockResolvedValue(mockResponse)

      const result = await requestCreateCategory({
        data: mockCategoryData,
        signal: mockAbortController.signal,
      })

      expect(result).toEqual(mockResponse.data)
      expect(axiosClient.post).toHaveBeenCalledWith(
        '/categories',
        {
          translations: [
            { locale: 'ru', title: 'Тестовая категория' },
            { locale: 'en', title: 'Test Category' },
          ],
        },
        { signal: mockAbortController.signal }
      )
    })

    it('transforms translations object to array', async () => {
      const mockResponse = { data: { id: '1', translations: [], _count: { products: 0 } } }
      vi.mocked(axiosClient.post).mockResolvedValue(mockResponse)

      await requestCreateCategory({
        data: mockCategoryData,
        signal: mockAbortController.signal,
      })

      const callArgs = vi.mocked(axiosClient.post).mock.calls[0]
      const payload = callArgs[1] as any
      expect(payload).toHaveProperty('translations')
      expect(Array.isArray(payload.translations)).toBe(true)
      expect(payload.translations).toHaveLength(2)
    })

    it('throws AlreadyExistsError on 409 response', async () => {
      const axiosError = new AxiosError(
        'Conflict',
        '409',
        undefined,
        undefined,
        {
          status: 409,
          data: { error: 'Category already exists' },
          statusText: 'Conflict',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestCreateCategory({
          data: mockCategoryData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow(AlreadyExistsError)

      await expect(
        requestCreateCategory({
          data: mockCategoryData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Category')
    })

    it('throws error when request is cancelled', async () => {
      const cancelError = new Error('canceled')
      vi.mocked(axiosClient.post).mockRejectedValue(cancelError)

      await expect(
        requestCreateCategory({
          data: mockCategoryData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Request cancelled')
    })

    it('throws custom error message from server response', async () => {
      const axiosError = new AxiosError(
        'Bad Request',
        '400',
        undefined,
        undefined,
        {
          status: 400,
          data: { error: 'Invalid category name' },
          statusText: 'Bad Request',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestCreateCategory({
          data: mockCategoryData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Invalid category name')
    })

    it('throws default error message when server does not provide one', async () => {
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
        requestCreateCategory({
          data: mockCategoryData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Something went wrong requestCreateCategory')
    })

    it('rethrows non-axios errors', async () => {
      const genericError = new Error('Network failure')
      vi.mocked(axiosClient.post).mockRejectedValue(genericError)

      await expect(
        requestCreateCategory({
          data: mockCategoryData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Network failure')
    })

    it('passes abort signal to axios', async () => {
      const mockResponse = { data: { id: '1', translations: [], _count: { products: 0 } } }
      vi.mocked(axiosClient.post).mockResolvedValue(mockResponse)

      const customSignal = new AbortController().signal

      await requestCreateCategory({
        data: mockCategoryData,
        signal: customSignal,
      })

      expect(axiosClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        { signal: customSignal }
      )
    })
  })
})
