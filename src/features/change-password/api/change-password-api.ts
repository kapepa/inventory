import { axiosInstance } from "@/shared";
import { AxiosError } from "axios";
import { ChangePasswordParams } from "../model/types";

export const requestChangePassword = async ({ signal, data }: ChangePasswordParams): Promise<string> => {
  try {
    const response = await axiosInstance.post('/users/change-password', data, { signal });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "Something went wrong requestChangePassword")
    }
    throw error
  }
}