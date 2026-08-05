import { VALIDATION_LIMITS } from "@/shared/constants/validation";
import { z } from "zod";

export const registerFormServerSchema = z.object({
  name: z
    .string()
    .min(VALIDATION_LIMITS.NAME_MIN_LENGTH)
    .max(VALIDATION_LIMITS.NAME_MAX_LENGTH)
    .trim(),

  email: z
    .email()
    .min(VALIDATION_LIMITS.EMAIL_MIN_LENGTH)
    .max(VALIDATION_LIMITS.EMAIL_MAX_LENGTH)
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH)
    .max(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH),
});

export type RegisterServerValues = z.infer<typeof registerFormServerSchema>;

export const loginFormServerSchema = z.object({
  email: z
    .email()
    .min(VALIDATION_LIMITS.EMAIL_MIN_LENGTH)
    .max(VALIDATION_LIMITS.EMAIL_MAX_LENGTH)
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH)
    .max(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH),
});

export type LoginServerValues = z.infer<typeof loginFormServerSchema>;
export type ResendVerificationServerValues = z.infer<typeof resendVerificationServerSchema>;

export const resendVerificationServerSchema = loginFormServerSchema.pick({ email: true });