import { axiosInstance } from "@/shared"
import axios, { AxiosError } from "axios"
import { CreateProductParams, ProductWithRelations } from "../model"

export const requestСreateProduct = async ({ signal, data }: CreateProductParams): Promise<ProductWithRelations> => {
  try {
    const response = await axiosInstance.post(`/products`, data, { signal })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to create product")
    }

    throw new Error("Failed to create product")
  }
}