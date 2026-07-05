import { AuthSignIn, AuthSignUp } from "./types";

export interface AuthSignUpParmas {
  data: AuthSignUp,
  signal?: AbortSignal,
}

export interface AuthSignInParmas {
  data: AuthSignIn,
  signal?: AbortSignal,
}