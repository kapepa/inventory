import { axiosInstance } from "@/shared";
import { AxiosError } from "axios";
import { AuthSignInParmas, AuthSignUpParmas } from "../model";

export const requestAuthLogin = async ({ signal, data }: AuthSignInParmas) => {
  try {
    const response = await axiosInstance.post('/auth/login', data, { signal });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "Something went wrong requestAuthLogin")
    }
    throw error
  }
}

export const requestAuthRegister = async ({ signal, data }: AuthSignUpParmas) => {
  try {
    const response = await axiosInstance.post('/auth/register', data, { signal });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "Something went wrong requestAuthRegister")
    }
    throw error
  }
}

export const requestAuthLogout = async (signal?: AbortSignal) => {
  try {
    const response = await axiosInstance.post('/auth/logout', { signal });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "Something went wrong requestAuthLogout")
    }
    throw error
  }
}