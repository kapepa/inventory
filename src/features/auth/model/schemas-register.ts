import { TranslationFunction } from "@/shared/types/translation";
import { z } from "zod";
import { confirmPassword, emailSchema, nameSchema, passwordSchema } from "./schemas-common";

export const registerFormSchema = (t: TranslationFunction) => z.object({
  name: nameSchema(t),
  email: emailSchema(t),
  password: passwordSchema(t),
  confirmPassword: confirmPassword(t),
}).refine((data) => data.password === data.confirmPassword, {
  message: t("passwords-not-match"),
  path: ["confirmPassword"],
});

export type RegisterSchema = ReturnType<typeof registerFormSchema>;
export type RegisterFormValues = z.infer<RegisterSchema>;