import { ChangeUserRoleType } from "./types";

export interface ChangeUserRoleParams {
  signal?: AbortSignal;
  data: ChangeUserRoleType;
}