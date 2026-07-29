import { axiosInstance } from "@/shared/lib/axios"
import { NotFoundError } from "@/shared";
import { AxiosError, isCancel } from "axios"
import { VerifyCodeEmailParams } from "../model";

export const requestVerifyCodeEmail = async ({ signal, data }: VerifyCodeEmailParams): Promise<void> => {
  try {
    const response = await axiosInstance.post<void>('/auth/verify-email', data, { signal });
    return response.data;
  } catch (error) {
    if (isCancel(error)) {
      throw new Error("Request cancelled");
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new NotFoundError('Verification code');
      }

      throw new Error(error.response?.data?.error || "Something went wrong requestVerifyEmail");
    }
    throw error;
  }
}