import { axiosInstance } from "@/shared";
import { AxiosError } from "axios";
import { VerifyCodeEmailParams } from "../model";

export const requestVerifyCodeEmail = async ({ signal, data }: VerifyCodeEmailParams): Promise<void> => {
  try {
    const response = await axiosInstance.post<void>('/auth/verify-email', data, { signal });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "Something went wrong requestVerifyEmail")
    }
    throw error
  }
}