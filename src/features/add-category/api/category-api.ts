import { axiosInstance } from "@/shared/lib/axios"
import { AlreadyExistsError } from "@/shared"
import { CreateCategoryParams } from "../model"
import { AxiosError, isCancel } from "axios"
import { CategoryWithProductCount } from "@/entities"

export const requestCreateCategory = async ({ data, signal }: CreateCategoryParams): Promise<CategoryWithProductCount> => {
  const payload = {
    ...data,
    translations: Object.values(data.translations)
  }

  try {
    const response = await axiosInstance.post<CategoryWithProductCount>('/categories',
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