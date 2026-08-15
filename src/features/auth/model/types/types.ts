import { User } from "@prisma/client";

export type AuthenticatedUser = Pick<User, "id" | "email" | "name" | "role" | "imageUrl">

export type AuthSignUp = Pick<User, "name" | "email" | "password">
export type AuthSignIn = Pick<User, | "email" | "password">
export type ResendVerification = Pick<User, "email">