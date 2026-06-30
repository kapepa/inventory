import { axiosInstance } from "@/shared"
import { CreateParishParams } from "../model"
import { AxiosError } from "axios"
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
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "Something went wrong requestCreateParish")
    }
    throw error
  }
}