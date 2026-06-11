import { axiosInstance } from "@/shared"
import axios, { AxiosError } from "axios"
import { FetchProductsParams, ResponseProductsDTO } from "../model"

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
