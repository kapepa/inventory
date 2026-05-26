import axios, { AxiosError } from "axios"

import { axiosInstance } from "@/shared"
import { Parish } from "@prisma/client"

interface FetchParishesParams {
  page: number
  limit: number
  search?: string
  signal?: AbortSignal
}

interface FetchParishesResponse {
  data: Parish[]
  total: number
  hasMore: boolean
}

export const fetchParishes = async ({
  page,
  limit,
  search = "",
  signal,
}: FetchParishesParams): Promise<FetchParishesResponse> => {
  const queryParams = {
    page,
    limit,
    ...(search && { search }),
  }

  try {
    const response = await axiosInstance.get<FetchParishesResponse>(`/parishes`, {
      params: queryParams,
      signal,
    })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch parishes")
    }

    throw new Error("Failed to fetch parishes")
  }
}