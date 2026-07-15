import { axiosInstance, InvalidPasswordError, SamePasswordError, UserNotFoundError } from "@/shared";
import axios, { AxiosError } from "axios";
import { ChangePasswordParams } from "../model/types";

export const requestChangePassword = async ({ signal, data }: ChangePasswordParams): Promise<string> => {
  try {
    const response = await axiosInstance.patch('/users/change-password', data, { signal });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled")
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        throw new InvalidPasswordError();
      }

      if (error.response?.status === 404) {
        throw new UserNotFoundError();
      }

      if (error.response?.status === 409) {
        throw new SamePasswordError();
      }

      const errorMessage = error.response?.data?.error || "Failed to change password";
      throw new Error(errorMessage);
    }

    throw error
  }
}