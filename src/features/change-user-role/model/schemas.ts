import { VALIDATION_LIMITS } from "@/shared";
import { Role } from "@prisma/client";
import { z } from "zod";

type TranslationFunction = (key: string) => string

export const changeUserRoleFormSchema = (t: TranslationFunction) => z.object({
  userId: z.string().min(1, t("user-id-required")),
  role: z.enum(Role, { message: t("invalid-role"), }),
});

export type ChangeUserRoleFormSchema = ReturnType<typeof changeUserRoleFormSchema>;
export type ChangeUserRoleFormValues = z.infer<ChangeUserRoleFormSchema>;

export const changeUserRoleServerSchema = z.object({
  userId: z.string().min(1).max(VALIDATION_LIMITS.ID_MAX_LENGTH),
  role: z.enum(Role),
});