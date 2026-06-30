import { axiosInstance } from "@/shared"
import { CreateCategoryParams } from "../model"
import { AxiosError } from "axios"
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
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "Something went wrong requestCreateCategory")
    }
    throw error
  }
}