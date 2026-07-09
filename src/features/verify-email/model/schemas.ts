import { VALIDATION_LIMITS } from "@/shared";
import { z } from "zod";

type TranslationFunction = (key: string) => string

export const codeFormSchema = (t: TranslationFunction) => z.object({
  email: z
    .email({ message: t("email-invalid") })
    .min(1, t("email-required"))
    .max(VALIDATION_LIMITS.EMAIL_MAX_LENGTH, t("email-max"))
    .toLowerCase()
    .trim(),
  token: z.string(t("token-required"))
    .min(VALIDATION_LIMITS.TOKEN_MIN_LENGTH, t("token-min"))
    .max(VALIDATION_LIMITS.TOKEN_MAX_LENGTH, t("token-max"))
    .trim(),
  code: z
    .string(t("code-required"))
    .length(VALIDATION_LIMITS.CODE_LENGTH, t("code-length"))
    .regex(/^\d+$/, t("code-digits"))
    .trim(),
});

export type CodeFormSchema = ReturnType<typeof codeFormSchema>;
export type CodeFormValues = z.infer<CodeFormSchema>;

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