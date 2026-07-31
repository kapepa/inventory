import { axiosClient } from "@/shared/lib/axios/client"
import { ForbiddenError } from "@/shared/lib"
import { DeleteAccountResult } from "../model/types"
import { AxiosError, isCancel } from "axios"

export const requestDeleteAccount = async (signal?: AbortSignal): Promise<DeleteAccountResult> => {
  try {
    const response = await axiosClient.delete<DeleteAccountResult>(`/users`, {
      signal,
    })

    return response.data
  } catch (error) {
    if (isCancel(error)) {
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