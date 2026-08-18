import { TranslationFunction } from "@/shared/types/translation";
import { z } from "zod";
import { emailSchema, passwordSchema } from "./schemas-common";

export const loginFormSchema = (t: TranslationFunction) => z.object({
  email: emailSchema(t),
  password: passwordSchema(t),
});

export type LoginFormSchema = ReturnType<typeof loginFormSchema>;
export type LoginFormValues = z.infer<LoginFormSchema>;