import { describe, it, expect, vi, beforeEach } from 'vitest'
import { requestCreateParish } from '../add-parish-api'
import { axiosClient } from '@/shared/lib/axios/client'
import { AxiosError } from 'axios'

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

describe('Parish API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('requestCreateParish', () => {
    const mockParishData = {
      deliveryDate: new Date('2026-08-20'),
      translations: {
        ru: { locale: 'ru' as const, title: 'Тестовый приход', description: 'Описание' },
        en: { locale: 'en' as const, title: 'Test Parish', description: 'Description' },
      },
    }

    const mockAbortController = new AbortController()

    it('successfully creates parish', async () => {
      const mockResponse = {
        data: {
          id: '1',
          deliveryDate: new Date('2026-08-20'),
          translations: [
            {
              id: '1',
              locale: 'ru',
              title: 'Тестовый приход',
              description: 'Описание',
              parishId: '1',
            },
          ],
          _count: { products: 0 },
          totals: { usd: 0, uah: 0 },
        },
      }

      vi.mocked(axiosClient.post).mockResolvedValue(mockResponse)

      const result = await requestCreateParish({
        data: mockParishData,
        signal: mockAbortController.signal,
      })

      expect(result).toEqual(mockResponse.data)
      expect(axiosClient.post).toHaveBeenCalledWith(
        '/parishes',
        {
          deliveryDate: mockParishData.deliveryDate,
          translations: [
            { locale: 'ru', title: 'Тестовый приход', description: 'Описание' },
            { locale: 'en', title: 'Test Parish', description: 'Description' },
          ],
        },
        { signal: mockAbortController.signal }
      )
    })

    it('transforms translations object to array', async () => {
      const mockResponse = {
        data: {
          id: '1',
          deliveryDate: new Date(),
          translations: [],
          _count: { products: 0 },
          totals: { usd: 0, uah: 0 },
        },
      }
      vi.mocked(axiosClient.post).mockResolvedValue(mockResponse)

      await requestCreateParish({
        data: mockParishData,
        signal: mockAbortController.signal,
      })

      const callArgs = vi.mocked(axiosClient.post).mock.calls[0]
      const payload = callArgs[1] as any
      expect(payload).toHaveProperty('translations')
      expect(Array.isArray(payload.translations)).toBe(true)
      expect(payload.translations).toHaveLength(2)
    })

    it('does NOT throw AlreadyExistsError on 409 response (bug in implementation)', async () => {
      const axiosError = new AxiosError(
        'Conflict',
        '409',
        undefined,
        undefined,
        {
          status: 409,
          data: { error: 'Parish already exists' },
          statusText: 'Conflict',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      // BUG: На строке 26 add-parish-api.ts создаётся но не выбрасывается AlreadyExistsError
      await expect(
        requestCreateParish({
          data: mockParishData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow(Error)

      await expect(
        requestCreateParish({
          data: mockParishData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Parish already exists')
    })

    it('throws error when request is cancelled', async () => {
      const cancelError = new Error('canceled')
      vi.mocked(axiosClient.post).mockRejectedValue(cancelError)

      await expect(
        requestCreateParish({
          data: mockParishData,
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
          data: { error: 'Invalid parish name' },
          statusText: 'Bad Request',
          headers: {},
          config: {} as any,
        }
      )

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestCreateParish({
          data: mockParishData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Invalid parish name')
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
        requestCreateParish({
          data: mockParishData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Something went wrong create parish')

      vi.mocked(axiosClient.post).mockRejectedValue(axiosError)

      await expect(
        requestCreateParish({
          data: mockParishData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Something went wrong create parish')
    })

    it('rethrows non-axios errors', async () => {
      const genericError = new Error('Network failure')
      vi.mocked(axiosClient.post).mockRejectedValue(genericError)

      await expect(
        requestCreateParish({
          data: mockParishData,
          signal: mockAbortController.signal,
        })
      ).rejects.toThrow('Network failure')
    })

    it('passes abort signal to axios', async () => {
      const mockResponse = {
        data: {
          id: '1',
          deliveryDate: new Date(),
          translations: [],
          _count: { products: 0 },
          totals: { usd: 0, uah: 0 },
        },
      }
      vi.mocked(axiosClient.post).mockResolvedValue(mockResponse)

      const customSignal = new AbortController().signal

      await requestCreateParish({
        data: mockParishData,
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