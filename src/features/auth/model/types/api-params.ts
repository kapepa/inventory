import { AuthSignIn, AuthSignUp, ResendVerification } from "./types";

export interface AuthSignUpParmas {
  data: AuthSignUp,
  signal?: AbortSignal,
}

export interface AuthSignInParmas {
  data: AuthSignIn,
  signal?: AbortSignal,
}

export interface ResendVerificationParmas {
  data: ResendVerification,
  signal?: AbortSignal,
}