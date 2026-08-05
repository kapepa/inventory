import { VALIDATION_LIMITS } from "@/shared/constants/validation";
import { z } from "zod";

export const codeFormServerSchema = z.object({
  email: z
    .email()
    .min(VALIDATION_LIMITS.EMAIL_MIN_LENGTH)
    .max(VALIDATION_LIMITS.EMAIL_MAX_LENGTH)
    .toLowerCase()
    .trim(),
  token: z
    .string()
    .min(VALIDATION_LIMITS.TOKEN_MIN_LENGTH)
    .max(VALIDATION_LIMITS.TOKEN_MAX_LENGTH)
    .trim(),
  code: z
    .string()
    .length(VALIDATION_LIMITS.CODE_LENGTH)
    // .regex(/^\d+$/)
    .trim(),
});

export type CodeServerValues = z.infer<typeof codeFormServerSchema>;