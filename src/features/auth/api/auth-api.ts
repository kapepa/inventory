import { axiosClient } from "@/shared/lib/axios/client"
import { AxiosError, isCancel } from "axios"
import { AlreadyExistsError, EmailSendError, InvalidCredentialsError, NotFoundError, NotVerifiedError } from "@/shared/lib/errors";
import { AuthenticatedUser, AuthSignInParmas, AuthSignUpParmas, ResendVerificationParmas } from "../model/types";

export const requestAuthLogin = async ({ signal, data }: AuthSignInParmas): Promise<AuthenticatedUser> => {
  try {
    const response = await axiosClient.post<AuthenticatedUser>('/auth/login', data, { signal });
    return response.data;
  } catch (error) {
    if (isCancel(error)) {
      throw new Error("Request cancelled");
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw new InvalidCredentialsError();
      }

      if (error.response?.status === 403) {
        throw new NotVerifiedError();
      }

      if (error.response?.status === 404) {
        throw new NotFoundError("Email");
      }

      throw new Error(error.response?.data?.error || "Something went wrong requestAuthLogin");
    }
    throw error;
  }
}

export const requestAuthRegister = async ({ signal, data }: AuthSignUpParmas): Promise<string> => {
  try {
    const response = await axiosClient.post('/auth/register', data, { signal });
    return response.data;
  } catch (error) {
    if (isCancel(error)) {
      throw new Error("Request cancelled");
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        throw new NotVerifiedError();
      }

      if (error.response?.status === 409) {
        throw new AlreadyExistsError('User');
      }

      if (error.response?.status === 500 && error.response?.data?.error?.includes('verification email')) {
        throw new EmailSendError(error.response.data.error);
      }

      throw new Error(error.response?.data?.error || "Something went wrong requestAuthRegister");
    }
    throw error;
  }
}

export const requestAuthLogout = async (signal?: AbortSignal) => {
  try {
    const response = await axiosClient.post('/auth/logout', { signal });
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
    const response = await axiosClient.post('/auth/resend-verification', data, { signal });
    return response.data;
  } catch (error) {
    if (isCancel(error)) {
      throw new Error("Request cancelled");
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new NotFoundError('Unverified user');
      }

      if (error.response?.status === 500 && error.response?.data?.error?.includes('verification email')) {
        throw new EmailSendError(error.response.data.error);
      }

      throw new Error(error.response?.data?.error || "Something went wrong requestResendVerification");
    }
    throw error;
  }
}