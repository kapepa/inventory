import { axiosInstance } from "@/shared"
import { DeleteCategoryParams, DeleteCategoryResult } from "../model/types"
import axios, { AxiosError } from "axios"

export const requestDeleteCategory = async ({ id, signal }: DeleteCategoryParams): Promise<DeleteCategoryResult> => {
  try {
    const response = await axiosInstance.delete<DeleteCategoryResult>(`/categories/${id}`, {
      signal,
    })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to delete parish")
    }

    throw new Error("Failed to delete parish")
  }
}