import axios, { AxiosError } from "axios"

import { axiosInstance } from "@/shared"
import { DeleteParishesParams, FetchParishesParams, GetParishesResponse } from "../model/types"
import { ParishFormValues } from "@/features"

export const fetchParishes = async ({
  page,
  limit,
  search = "",
  signal,
}: FetchParishesParams): Promise<GetParishesResponse> => {
  const queryParams = {
    page,
    limit,
    ...(search && { search }),
  }

  try {
    const response = await axiosInstance.get<GetParishesResponse>(`/parishes`, {
      params: queryParams,
      signal,
    })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      const message = error.response?.data?.error || error.response?.data?.message || "Failed to fetch parishes";
      throw new Error(message);
    }

    throw new Error("Failed to fetch parishes")
  }
}

export const createParish = async (data: ParishFormValues) => {
  const payload = {
    ...data,
    translations: Object.values(data.translations)
  }
  try {
    const response = await axiosInstance.post('/parishes', payload)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Something went wrong")
    }
    throw error
  }
}

export const deleteParish = async ({ id, signal }: DeleteParishesParams) => {
  try {
    const response = await axiosInstance.delete(`/parishes/${id}`, {
      signal,
    })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to delete parish")
    }

    throw new Error("Failed to delete parish")
  }
}