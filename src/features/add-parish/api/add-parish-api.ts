import { axiosInstance } from "@/shared"
import { CreateParishParams, ParishWithRelations } from "../model"
import { AxiosError } from "axios"

export const requestCreateParish = async ({ data, signal }: CreateParishParams): Promise<ParishWithRelations> => {
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