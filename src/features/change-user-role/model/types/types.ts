import { Role } from "@prisma/client";

export type ChangeUserRoleType = {
  userId: string;
  role: Role;
}