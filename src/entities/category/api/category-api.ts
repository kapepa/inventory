import { axiosInstance } from "@/shared"
import { CategoryWithTranslations, RequestCategoriesParams } from "../model/types"
import axios, { AxiosError } from "axios"

export const requestCategories = async ({ signal }: RequestCategoriesParams = {}): Promise<CategoryWithTranslations[]> => {
  try {
    const response = await axiosInstance.get(`/categories`, { signal })
    return response.data

  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to request categories")
    }

    throw new Error("Failed to request categories")
  }
}
