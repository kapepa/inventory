import { axiosInstance, ForbiddenError, InvalidInputError, NotFoundError } from "@/shared";
import axios, { AxiosError } from "axios";
import { ChangeUserRoleParams } from "../model/types";


export const requestChangeUserRole = async ({ signal, data }: ChangeUserRoleParams): Promise<string> => {
  try {
    const response = await axiosInstance.patch(`/users/role`, data, { signal });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled");
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        throw new ForbiddenError('Admin access required');
      }

      if (error.response?.status === 400) {
        throw new InvalidInputError('User already has this role');
      }

      if (error.response?.status === 404) {
        throw new NotFoundError('User');
      }

      const errorMessage = error.response?.data?.error || "Failed to change user role";
      throw new Error(errorMessage);
    }

    throw error;
  }
}
