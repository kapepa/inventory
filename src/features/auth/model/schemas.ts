import { z } from "zod";

type TranslationFunction = (key: string) => string

export const loginFormSchema = (t: TranslationFunction) => z.object({
  email: z
    .email({ message: t("email-invalid") })
    .min(1, t("email-required"))
    .max(254, t("email-max"))
    .toLowerCase()
    .trim(),
  password: z
    .string(t("password-required"))
    .min(8, t("password-min"))
    .max(128, t("password-max"))
    .regex(/[A-Z]/, { message: t("password-uppercase") })
    .regex(/[0-9]/, { message: t("password-number") })
    .regex(/[^A-Za-z0-9]/, { message: t("password-special") }),
});

export const registerFormSchema = (t: TranslationFunction) => z.object({
  name: z
    .string(t("name-required"))
    .min(2, t("name-min"))
    .max(100, t("name-max"))
    .trim(),
  email: z
    .email({ message: t("email-invalid") })
    .min(1, t("email-required"))
    .max(254, t("email-max"))
    .toLowerCase()
    .trim(),
  password: z
    .string(t("password-required"))
    .min(8, t("password-min"))
    .max(128, t("password-max"))
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
