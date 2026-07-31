import { VALIDATION_LIMITS } from "@/shared/constants";
import { Role } from "@prisma/client";
import { z } from "zod";

export const changeUserRoleServerSchema = z.object({
  userId: z.string().min(1).max(VALIDATION_LIMITS.ID_MAX_LENGTH),
  role: z.enum(Role),
});