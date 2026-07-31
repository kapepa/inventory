import { axiosClient } from "@/shared/lib/axios/client"
import { AxiosError, isCancel } from "axios"
import { ChangeUserRoleParams, UserRoleType } from "../model/types";
import { ForbiddenError, InvalidInputError } from "@/shared/lib";

export const requestChangeUserRole = async ({ signal, data }: ChangeUserRoleParams): Promise<UserRoleType> => {
  try {
    const response = await axiosClient.patch<UserRoleType>(`/users/role`, data, { signal });
    return response.data;
  } catch (error) {
    if (isCancel(error)) {
      throw new Error("Request cancelled");
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        throw new InvalidInputError('User already has this role');
      }

      if (error.response?.status === 403) {
        throw new ForbiddenError('Admin access required');
      }

      const errorMessage = error.response?.data?.error || "Failed to change user role";
      throw new Error(errorMessage);
    }

    throw error;
  }
}
