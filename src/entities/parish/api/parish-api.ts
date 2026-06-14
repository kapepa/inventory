import axios, { AxiosError } from "axios"

import { axiosInstance } from "@/shared"
import { FetchParishesParams, ResponseParishes } from "../model"

export const fetchParishes = async ({ page, limit, search = "", signal }: FetchParishesParams): Promise<ResponseParishes> => {
  const queryParams = {
    page,
    limit,
    ...(search && { search }),
  }

  try {
    const response = await axiosInstance.get<ResponseParishes>(`/parishes`, {
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
      const message = error.response?.data?.error || error.response?.data?.message || "Failed to fetch parishes";
      throw new Error(message);
    }

    throw new Error("Failed to fetch parishes")
  }
}