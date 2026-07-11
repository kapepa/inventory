import { axiosInstance, ProductAlreadyExistsError } from "@/shared"
import axios, { AxiosError } from "axios"
import { CreateProductParams } from "../model"
import { ProductWithRelationsShort } from "@/entities"

export const requestСreateProduct = async ({ signal, data }: CreateProductParams): Promise<ProductWithRelationsShort> => {
  try {
    const response = await axiosInstance.post<ProductWithRelationsShort>(`/products`, data, { signal })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {

      if (error.response?.status === 409) {
        throw new ProductAlreadyExistsError();
      }

      const errorMessage = error.response?.data?.error || "Failed to create product"
      throw new Error(errorMessage)
    }

    throw error
  }
}