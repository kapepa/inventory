import { axiosInstance, InvalidCredentialsError, InvalidInputError, NotFoundError } from "@/shared";
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
        throw new InvalidCredentialsError();
      }

      if (error.response?.status === 404) {
        throw new NotFoundError("User");
      }

      if (error.response?.status === 409) {
        throw new InvalidInputError('New password must differ from current');
      }

      const errorMessage = error.response?.data?.error || "Failed to change password";
      throw new Error(errorMessage);
    }

    throw error
  }
}