import axios, { AxiosError } from "axios"

import { axiosInstance } from "@/shared"
import { FetchParishesParams, DeleteParishesParams, ResponseParishes, CreateParishParams, ParishWithRelations, DeleteParishResult } from "../model"

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

export const createParish = async ({ data, signal }: CreateParishParams): Promise<ParishWithRelations> => {
  const payload = {
    ...data,
    translations: Object.values(data.translations)
  }

  try {
    const response = await axiosInstance.post<ParishWithRelations>('/parishes',
      payload,
      { signal }
    )
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Something went wrong")
    }
    throw error
  }
}

export const deleteParish = async ({ id, signal }: DeleteParishesParams): Promise<DeleteParishResult> => {
  try {
    const response = await axiosInstance.delete<DeleteParishResult>(`/parishes/${id}`, {
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