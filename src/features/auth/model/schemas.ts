import { VALIDATION_LIMITS } from "@/shared";
import { z } from "zod";

type TranslationFunction = (key: string) => string

export const loginFormSchema = (t: TranslationFunction) => z.object({
  email: z
    .email({ message: t("email-invalid") })
    .min(1, t("email-required"))
    .max(VALIDATION_LIMITS.EMAIL_MAX_LENGTH, t("email-max"))
    .toLowerCase()
    .trim(),
  password: z
    .string(t("password-required"))
    .min(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH, t("password-min"))
    .max(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH, t("password-max"))
    .regex(/[A-Z]/, { message: t("password-uppercase") })
    .regex(/[0-9]/, { message: t("password-number") })
    .regex(/[^A-Za-z0-9]/, { message: t("password-special") }),
});

export const registerFormSchema = (t: TranslationFunction) => z.object({
  name: z
    .string(t("name-required"))
    .min(VALIDATION_LIMITS.NAME_MIN_LENGTH, t("name-min"))
    .max(VALIDATION_LIMITS.NAME_MAX_LENGTH, t("name-max"))
    .trim(),
  email: z
    .email({ message: t("email-invalid") })
    .min(1, t("email-required"))
    .max(VALIDATION_LIMITS.EMAIL_MAX_LENGTH, t("email-max"))
    .toLowerCase()
    .trim(),
  password: z
    .string(t("password-required"))
    .min(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH, t("password-min"))
    .max(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH, t("password-max"))
    .regex(/[A-Z]/, { message: t("password-uppercase") })
    .regex(/[0-9]/, { message: t("password-number") })
    .regex(/[^A-Za-z0-9]/, { message: t("password-special") }),
  confirmPassword: z
    .string().min(1, t("confirm-password-required")),
}).refine((data) => data.password === data.confirmPassword, {
  message: t("passwords-not-match"),
  path: ["confirmPassword"],
});

export type LoginFormSchema = ReturnType<typeof loginFormSchema>;
export type LoginFormValues = z.infer<LoginFormSchema>;
export type RegisterSchema = ReturnType<typeof registerFormSchema>;
export type RegisterFormValues = z.infer<RegisterSchema>;

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