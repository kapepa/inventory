import { axiosInstance } from "@/shared"
import { CategoriesProductCountParams, CategoryWithTranslations, RequestCategoriesParams } from "../model/types"
import axios, { AxiosError } from "axios"

const fetchCategoriesBase = async <T>(
  endpoint: string,
  { signal, ...queryParams }: & { signal?: AbortSignal }
): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(endpoint, {
      params: queryParams,
      signal,
    })
    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      if (!error.response) {
        throw new Error("Check your Internet connection")
      }
      const message = error.response?.data?.error || error.response?.data?.message || "Failed to fetch categories"
      throw new Error(message)
    }

    throw new Error(`Failed to fetch from ${endpoint}`)
  }
}

export const requestCategories = (params: RequestCategoriesParams) =>
  fetchCategoriesBase<CategoryWithTranslations[]>("/categories", params)

export const requestCategoriesWithProductCount = (params: CategoriesProductCountParams) =>
  fetchCategoriesBase<CategoryWithTranslations[]>("/categories/products-count", params)