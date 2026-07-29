import { axiosInstance } from "@/shared/lib/axios";
import { ForbiddenError, NotFoundError } from "@/shared";
import { DeleteProductResult, DeleteProductParams } from "../model/types";
import { AxiosError, isCancel } from "axios"

export const requestDeleteProduct = async ({ id, signal }: DeleteProductParams): Promise<DeleteProductResult> => {
  try {
    const response = await axiosInstance.delete<DeleteProductResult>(`/products/${id}`, { signal });
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
        throw new NotFoundError('Product');
      }

      const errorMessage = error.response?.data?.error || "Failed to delete product"
      throw new Error(errorMessage)
    }

    throw error
  }
}