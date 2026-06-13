import { axiosInstance } from "@/shared"
import axios, { AxiosError } from "axios"
import { DeleteProductResult, FetchProductsParams, RequestDeleteProduct, ResponseProductsDTO } from "../model"

export const fetchProducts = async ({
  parishId,
  page,
  limit,
  search = "",
  signal,
}: FetchProductsParams): Promise<ResponseProductsDTO> => {
  const queryParams = {
    parishId,
    page,
    limit,
    ...(search && { search }),
  }

  try {
    const response = await axiosInstance.get<ResponseProductsDTO>(`/products`, {
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
        throw new Error("Проверьте подключение к интернету");
      }
      const message = error.response?.data?.error || error.response?.data?.message || "Failed to fetch products";
      throw new Error(message);
    }

    throw new Error("Failed to fetch products")
  }
}

export const requestDeleteProduct = async ({ id, signal }: RequestDeleteProduct): Promise<DeleteProductResult> => {
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