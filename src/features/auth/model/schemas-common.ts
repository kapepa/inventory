import { VALIDATION_LIMITS } from "@/shared/constants/validation";
import { TranslationFunction } from "@/shared/types/translation";
import { z } from "zod";

export const nameSchema = (t: TranslationFunction) => z
  .string(t("name-required"))
  .min(VALIDATION_LIMITS.NAME_MIN_LENGTH, t("name-min"))
  .max(VALIDATION_LIMITS.NAME_MAX_LENGTH, t("name-max"))
  .trim()

export const emailSchema = (t: TranslationFunction) => z
  .email({ message: t("email-invalid") })
  .min(1, t("email-required"))
  .max(VALIDATION_LIMITS.EMAIL_MAX_LENGTH, t("email-max"))
  .toLowerCase()
  .trim()

export const passwordSchema = (t: TranslationFunction) => z
  .string(t("password-required"))
  .min(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH, t("password-min"))
  .max(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH, t("password-max"))
  .regex(/[A-Z]/, { message: t("password-uppercase") })
  .regex(/[0-9]/, { message: t("password-number") })
  .regex(/[^A-Za-z0-9]/, { message: t("password-special") })

export const confirmPassword = (t: TranslationFunction) => z
  .string().min(1, t("confirm-password-required"))