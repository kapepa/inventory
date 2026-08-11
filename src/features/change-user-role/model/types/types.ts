import { Role } from "@prisma/client";

export type UserRoleType = Role

export type ChangeUserRoleType = {
  userId: string;
  role: UserRoleType;
}

export interface RoleSelectorLabels {
  title: string;
  roleLabel: string;
  infoText: string;
  selectPlaceholder: string;
  roleUser: string;
  roleAdmin: string;
  resetButton: string;
  changeRoleButton: string;
}