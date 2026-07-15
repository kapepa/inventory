import { AlreadyExistsError, axiosInstance, InvalidCredentialsError, NotFoundError, NotVerifiedError } from "@/shared";
import axios, { AxiosError } from "axios";
import { AuthenticatedUser, AuthSignInParmas, AuthSignUpParmas, ResendVerificationParmas } from "../model";

export const requestAuthLogin = async ({ signal, data }: AuthSignInParmas): Promise<AuthenticatedUser> => {
  try {
    const response = await axiosInstance.post<AuthenticatedUser>('/auth/login', data, { signal });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled");
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw new InvalidCredentialsError();
      }

      if (error.response?.status === 403) {
        throw new NotVerifiedError();
      }

      throw new Error(error.response?.data?.error || "Something went wrong requestAuthLogin");
    }
    throw error;
  }
}

export const requestAuthRegister = async ({ signal, data }: AuthSignUpParmas): Promise<string> => {
  try {
    const response = await axiosInstance.post('/auth/register', data, { signal });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled");
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        throw new NotVerifiedError();
      }

      if (error.response?.status === 409) {
        throw new AlreadyExistsError('User');
      }

      throw new Error(error.response?.data?.error || "Something went wrong requestAuthRegister");
    }
    throw error;
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

export const requestResendVerification = async ({ signal, data }: ResendVerificationParmas): Promise<string> => {
  try {
    const response = await axiosInstance.post('/auth/resend-verification', data, { signal });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled");
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new NotFoundError('Unverified user');
      }

      throw new Error(error.response?.data?.error || "Something went wrong requestResendVerification");
    }
    throw error;
  }
}