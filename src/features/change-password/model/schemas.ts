import { VALIDATION_LIMITS } from "@/shared";
import { z } from "zod";

type TranslationFunction = (key: string) => string

export const changePasswordFormSchema = (t: TranslationFunction) => z.object({
  currentPassword: z
    .string()
    .min(1, t("current-password-required"))
    .max(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH, t("password-max")),
  newPassword: z
    .string()
    .min(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH, t("password-min"))
    .max(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH, t("password-max"))
    .regex(/[A-Z]/, { message: t("password-uppercase") })
    .regex(/[0-9]/, { message: t("password-number") })
    .regex(/[^A-Za-z0-9]/, { message: t("password-special") }),
  confirmPassword: z
    .string()
    .min(1, t("confirm-password-required")),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: t("passwords-not-match"),
  path: ["confirmPassword"],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: t("new-password-must-differ"),
  path: ["newPassword"],
});

export type ChangePasswordFormSchema = ReturnType<typeof changePasswordFormSchema>;
export type ChangePasswordFormValues = z.infer<ChangePasswordFormSchema>;

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