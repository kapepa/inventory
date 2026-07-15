import { AlreadyExistsError, axiosInstance } from "@/shared"
import { CreateParishParams } from "../model"
import axios, { AxiosError } from "axios"
import { ParishWithRelationsTotals } from "@/entities"

export const requestCreateParish = async ({ data, signal }: CreateParishParams): Promise<ParishWithRelationsTotals> => {
  const payload = {
    ...data,
    translations: Object.values(data.translations)
  }

  try {
    const response = await axiosInstance.post<ParishWithRelationsTotals>('/parishes',
      payload,
      { signal }
    )
    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        new AlreadyExistsError("Parish");
      }

      const errorMessage = error.response?.data?.error || "Something went wrong create parish"
      throw new Error(errorMessage)
    }

    throw error
  }
}