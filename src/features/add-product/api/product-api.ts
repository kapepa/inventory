import { axiosClient } from "@/shared/lib/axios/client"
import { AxiosError, isCancel } from "axios"
import { AlreadyExistsError } from "@/shared/lib"
import { CreateProductParams } from "../model/types"
import { ProductWithRelationsShort } from "@/entities/product/model/types"

export const requestСreateProduct = async ({ signal, data }: CreateProductParams): Promise<ProductWithRelationsShort> => {
  try {
    const response = await axiosClient.post<ProductWithRelationsShort>(`/products`, data, { signal })

    return response.data
  } catch (error) {
    if (isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {

      if (error.response?.status === 409) {
        throw new AlreadyExistsError("Product");
      }

      const errorMessage = error.response?.data?.error || "Failed to create product"
      throw new Error(errorMessage)
    }

    throw error
  }
}