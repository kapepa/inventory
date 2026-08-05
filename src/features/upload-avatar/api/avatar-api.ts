import { axiosClient } from "@/shared/lib/axios/client"
import { AxiosError, isCancel } from "axios"
import { UploadAvatarParmas } from "../model/types"
import { ForbiddenError } from "@/shared/lib/errors"

export const requestUploadAvatar = async ({ data, signal }: UploadAvatarParmas): Promise<{ imageUrl: string }> => {
  try {
    const response = await axiosClient.patch("/users/avatar", data, { signal })

    return response.data
  } catch (error) {
    if (isCancel(error)) {
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