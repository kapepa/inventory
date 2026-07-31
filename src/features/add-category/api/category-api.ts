import { axiosClient } from "@/shared/lib/axios/client"
import { AxiosError, isCancel } from "axios"
import { AlreadyExistsError } from "@/shared/lib"
import { CategoryWithProductCount } from "@/entities/category/model/types"
import { CreateCategoryParams } from "../model/types"

export const requestCreateCategory = async ({ data, signal }: CreateCategoryParams): Promise<CategoryWithProductCount> => {
  const payload = {
    ...data,
    translations: Object.values(data.translations)
  }

  try {
    const response = await axiosClient.post<CategoryWithProductCount>('/categories',
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
        throw new AlreadyExistsError("Category");
      }

      const errorMessage = error.response?.data?.error || "Something went wrong requestCreateCategory"
      throw new Error(errorMessage)
    }
    throw error
  }
}