import { VerificationCode } from "@prisma/client";

export type VerifyCodeEmail = Pick<VerificationCode, "code" | "email" | "token">