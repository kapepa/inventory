import { axiosClient } from "@/shared/lib/axios/client"
import { AxiosError, isCancel } from "axios"
import { AlreadyExistsError } from "@/shared/lib/errors"
import { CreateParishParams } from "../model/types"
import { ParishWithRelationsTotals } from "@/entities/parish/model/types"

export const requestCreateParish = async ({ data, signal }: CreateParishParams): Promise<ParishWithRelationsTotals> => {
  const payload = {
    ...data,
    translations: Object.values(data.translations)
  }

  try {
    const response = await axiosClient.post<ParishWithRelationsTotals>('/parishes',
      payload,
      { signal }
    )
    return response.data
  } catch (error) {
    if (isCancel(error)) {
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