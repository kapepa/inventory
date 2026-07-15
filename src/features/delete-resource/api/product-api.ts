import { axiosInstance, ForbiddenError, NotFoundError } from "@/shared";
import axios, { AxiosError } from "axios";
import { DeleteProductResult, DeleteProductParams } from "../model/types";

export const requestDeleteProduct = async ({ id, signal }: DeleteProductParams): Promise<DeleteProductResult> => {
  try {
    const response = await axiosInstance.delete<DeleteProductResult>(`/products/${id}`, { signal });
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
        throw new NotFoundError('Product');
      }

      const errorMessage = error.response?.data?.error || "Failed to delete product"
      throw new Error(errorMessage)
    }

    throw error
  }
}