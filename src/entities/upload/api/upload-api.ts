import { axiosClient } from "@/shared/lib/axios/client"
import { ResponsiveImageSizes } from '../model/types/types'
import { AxiosError, isCancel } from "axios"
import { RequestUploadFileParams } from "../model/types"

export const requestUploadFile = async ({ file, signal }: RequestUploadFileParams): Promise<ResponsiveImageSizes> => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axiosClient.post<ResponsiveImageSizes>('/upload', formData,
      {
        signal,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return response.data
  } catch (error) {
    if (isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to upload File")
    }

    throw new Error("Failed to upload File")
  }
}