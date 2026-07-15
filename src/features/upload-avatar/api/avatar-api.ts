import { axiosInstance, ForbiddenError } from "@/shared";
import axios, { AxiosError } from "axios"
import { UploadAvatarParmas } from "../model/types"

export const requestUploadAvatar = async ({ data, signal }: UploadAvatarParmas): Promise<{ imageUrl: string }> => {
  try {
    const response = await axiosInstance.patch("/users/avatar", data, { signal })

    return response.data
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled");
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        throw new ForbiddenError('You can only update your own avatar');
      }

      throw new Error(error.response?.data?.error || "Something went wrong requestUploadAvatar");
    }
    throw error;
  }
}