import { axiosInstance } from '@/shared'
import { UploadResponse } from '../model/types/types'
import axios, { AxiosError } from 'axios'
import { RequestUploadFileParams } from '../model'


export const requestUploadFile = async ({ file, signal }: RequestUploadFileParams): Promise<UploadResponse> => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axiosInstance.post<UploadResponse>('/upload', formData,
      {
        signal,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to upload File")
    }

    throw new Error("Failed to upload File")
  }
}