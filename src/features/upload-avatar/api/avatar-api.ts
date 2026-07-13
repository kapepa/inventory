import { axiosInstance } from "@/shared"
import { AxiosError } from "axios"
import { UploadAvatarParmas } from "../model/types"

export const requestUploadAvatar = async ({ data, signal }: UploadAvatarParmas): Promise<{ imageUrl: string }> => {
  try {
    const response = await axiosInstance.post("/users/avatar", data, { signal })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "Something went wrong requestuploadAvatar")
    }
    throw error
  }
}