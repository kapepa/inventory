import { User } from "@prisma/client";

export type AuthenticatedUser = Pick<User, "id" | "email" | "name" | "role" | "imageUrl">

export type AuthSignUp = Pick<User, "name" | "email" | "password">
export type AuthSignIn = Pick<User, | "email" | "password">
export type ResendVerification = Pick<User, "email">

export interface LoginFormLabels {
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  resetButton: string;
  signInButton: string;
}

export interface RegisterFormLabels extends Omit<LoginFormLabels, "signInButton"> {
  nameLabel: string;
  namePlaceholder: string;
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  signUpButton: string;
}