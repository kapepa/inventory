import { axiosInstance } from "@/shared";
import { AxiosError } from "axios";

export const requestAuthLogin = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "Something went wrong requestAuthLogin")
    }
    throw error
  }
}

export const requestAuthRegister = async (name: string, email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/register', { name, email, password });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "Something went wrong requestAuthRegister")
    }
    throw error
  }
}

export const requestAuthLogout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "Something went wrong requestAuthLogout")
    }
    throw error
  }
}