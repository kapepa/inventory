import { VerificationCode } from "@prisma/client";

export type VerifyCodeEmail = Pick<VerificationCode, "code" | "email" | "token">

export interface VerifyCodeFormLabels {
  codeLabel: string;
  codePlaceholder: string;
  resetButton: string;
  sendButton: string;
}