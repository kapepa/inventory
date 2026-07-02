import { axiosInstance } from "@/shared"
import axios, { AxiosError } from "axios"
import { FetchUsersParams, ResponseUsersDTO } from "../model"

const fetchUsersBase = async <T>(endpoint: string, { search = "", signal, ...props }: FetchUsersParams): Promise<T> => {
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

export const fetchUsers = (params: FetchUsersParams) =>
  fetchUsersBase<ResponseUsersDTO>("/users", params)


