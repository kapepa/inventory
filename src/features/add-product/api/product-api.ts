import { axiosInstance } from "@/shared"
import axios, { AxiosError } from "axios"
import { CreateProductParams } from "../model"

export const requestСreateProduct = async ({ signal, data }: CreateProductParams) => {
  try {
    const response = await axiosInstance.post(`/products`, {
      signal,
      data
    })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to delete product")
    }

    throw new Error("Failed to delete product")
  }
}