import { VerificationCode } from "@prisma/client";

export interface VerificationCodeInput {
  userId: string,
  email: string,
}

export type VerificationCodeOutput = Pick<VerificationCode, "token" | "code">