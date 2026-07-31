import { axiosClient } from "@/shared/lib/axios/client"
import { AxiosError, isCancel } from "axios"
import { FetchUsersParams, ResponseUsersDTO } from "../model/types"

const fetchUsersBase = async <T>(endpoint: string, { search = "", signal, ...props }: FetchUsersParams): Promise<T> => {
  const queryParams = {
    ...props,
    ...(search && { search }),
  }

  try {
    const response = await axiosClient.get<T>(endpoint, {
      params: queryParams,
      signal,
    })
    return response.data
  } catch (error) {
    if (isCancel(error)) throw new Error("Request cancelled")

    if (error instanceof AxiosError) {
      const message = error.response?.data?.error || error.response?.data?.message || "Failed to fetch products";
      throw new Error(message);
    }

    throw new Error(`Failed to fetch products from ${endpoint}`)
  }
}

export const fetchUsers = (params: FetchUsersParams) =>
  fetchUsersBase<ResponseUsersDTO>("/users", params)


