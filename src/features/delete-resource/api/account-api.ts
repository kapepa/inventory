import { axiosInstance, ForbiddenError } from "@/shared"
import { DeleteAccountResult } from "../model/types"
import axios, { AxiosError } from "axios"

export const requestDeleteAccount = async (signal?: AbortSignal): Promise<DeleteAccountResult> => {
  try {
    const response = await axiosInstance.delete<DeleteAccountResult>(`/users`, {
      signal,
    })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw new ForbiddenError('Unauthorized');
      }

      const errorMessage = error.response?.data?.error || "Failed to delete account"
      throw new Error(errorMessage)
    }

    throw error
  }
}