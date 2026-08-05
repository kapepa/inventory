import { VALIDATION_LIMITS } from "@/shared/constants/validation";
import { z } from "zod";

export const changePasswordServerSchema = z.object({
  currentPassword: z
    .string()
    .min(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH)
    .max(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH),
  newPassword: z
    .string()
    .min(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH)
    .max(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH),
});