import { VALIDATION_LIMITS } from "@/shared/constants/validation";
import { z } from "zod";

export const changePasswordServerSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH)
      .max(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH),
    newPassword: z
      .string()
      .trim()
      .min(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH)
      .max(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH),
    userId: z
      .string()
      .min(1)
      .max(VALIDATION_LIMITS.ID_MAX_LENGTH),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });