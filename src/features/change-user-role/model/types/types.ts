import { Role } from "@prisma/client";

export type UserRoleType = Role

export type ChangeUserRoleType = {
  userId: string;
  role: UserRoleType;
}