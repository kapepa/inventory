import { axiosInstance } from "@/shared";
import { AxiosError } from "axios";
import { DeleteProductResult, DeleteProductParams } from "../model/types";

export const requestDeleteProduct = async ({ id, signal }: DeleteProductParams): Promise<DeleteProductResult> => {
  try {
    const response = await axiosInstance.delete<DeleteProductResult>(`/products/${id}`, { signal });
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.error || error.response?.data?.message || "Failed to delete product";
      throw new Error(message);
    }
    throw new Error("Failed to delete product")
  }
}