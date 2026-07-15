import { axiosInstance, ForbiddenError, HasDependenciesError, NotFoundError } from "@/shared"
import { DeleteParishesParams, DeleteParishResult } from "../model/types"
import axios, { AxiosError } from "axios"

export const requestDeleteParish = async ({ id, signal }: DeleteParishesParams): Promise<DeleteParishResult> => {
  try {
    const response = await axiosInstance.delete<DeleteParishResult>(`/parishes/${id}`, {
      signal,
    })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        throw new ForbiddenError('Admin access required');
      }

      if (error.response?.status === 404) {
        throw new NotFoundError('Parish');
      }

      if (error.response?.status === 409) {
        throw new HasDependenciesError('Parish');
      }

      const errorMessage = error.response?.data?.error || "Failed to delete parish"
      throw new Error(errorMessage)
    }

    throw error
  }
}