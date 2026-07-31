import { axiosClient } from "@/shared/lib/axios/client"
import { AxiosError, isCancel } from "axios"
import { FetchParishesParams, ResponseParishesDTO, ResponseParishesTotalsDTO } from "../model/types"

const fetchParishesBase = async <T>(
  endpoint: string,
  { search = "", signal, ...props }: FetchParishesParams
): Promise<T> => {
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
    if (isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      if (!error.response) {
        throw new Error("Check your Internet connection")
      }
      const message = error.response?.data?.error || error.response?.data?.message || "Failed to fetch parishes"
      throw new Error(message)
    }

    throw new Error(`Failed to fetch from ${endpoint}`)
  }
}

export const fetchParishes = (params: FetchParishesParams) =>
  fetchParishesBase<ResponseParishesDTO>("/parishes", params)

export const fetchParishesTotals = (params: FetchParishesParams) =>
  fetchParishesBase<ResponseParishesTotalsDTO>("/parishes/totals", params)