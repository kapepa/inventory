import { axiosClient } from "@/shared/lib/axios/client"
import { ForbiddenError, HasDependenciesError, NotFoundError } from "@/shared/lib/errors"
import { DeleteCategoryParams, DeleteCategoryResult } from "../model/types"
import { AxiosError, isCancel } from "axios"

export const requestDeleteCategory = async ({ id, signal }: DeleteCategoryParams): Promise<DeleteCategoryResult> => {
  try {
    const response = await axiosClient.delete<DeleteCategoryResult>(`/categories/${id}`, {
      signal,
    })

    return response.data
  } catch (error) {
    if (isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        throw new ForbiddenError('Admin access required');
      }

      if (error.response?.status === 404) {
        throw new NotFoundError('Category');
      }

      if (error.response?.status === 409) {
        throw new HasDependenciesError('Category');
      }

      const errorMessage = error.response?.data?.error || "Failed to delete category"
      throw new Error(errorMessage)
    }

    throw error
  }
}