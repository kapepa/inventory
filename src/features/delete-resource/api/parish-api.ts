import { axiosInstance } from "@/shared"
import { DeleteParishesParams, DeleteParishResult } from "../model/types"
import axios, { AxiosError } from "axios"

export const requestDeleteParish = async ({ id, signal }: DeleteParishesParams): Promise<DeleteParishResult> => {
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