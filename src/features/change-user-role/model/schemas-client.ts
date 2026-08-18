import { TranslationFunction } from "@/shared/types/translation";
import { Role } from "@prisma/client";
import { z } from "zod";

export const changeUserRoleFormSchema = (t: TranslationFunction) => z.object({
  userId: z.string().min(1, t("user-id-required")),
  role: z.enum(Role, { message: t("invalid-role"), }),
});

export type ChangeUserRoleFormSchema = ReturnType<typeof changeUserRoleFormSchema>;
export type ChangeUserRoleFormValues = z.infer<ChangeUserRoleFormSchema>;