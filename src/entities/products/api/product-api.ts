import { axiosInstance } from "@/shared"
import axios, { AxiosError } from "axios"
import { FetchProductsParams, ResponseProductsShortDTO, ResponseProductsWideDTO } from "../model"

const fetchProductsBase = async <T>(endpoint: string, { search = "", signal, ...props }: FetchProductsParams): Promise<T> => {
  const queryParams = {
    ...props,
    ...(search && { search }),
  }

  try {
    const response = await axiosInstance.get<T>(endpoint, {
      params: queryParams,
      signal,
    })
    return response.data
  } catch (error) {
    if (axios.isCancel(error)) throw new Error("Request cancelled")

    if (error instanceof AxiosError) {
      const message = error.response?.data?.error || error.response?.data?.message || "Failed to fetch products";
      throw new Error(message);
    }

    throw new Error(`Failed to fetch products from ${endpoint}`)
  }
}

export const fetchProductsShort = (params: FetchProductsParams) =>
  fetchProductsBase<ResponseProductsShortDTO>("/products/short", params)

export const fetchProductsWide = (params: FetchProductsParams) =>
  fetchProductsBase<ResponseProductsWideDTO>("/products/wide", params)

