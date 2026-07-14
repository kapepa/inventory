import { ChangePasswordType } from "./types";

export interface ChangePasswordParams {
  signal?: AbortSignal;
  data: ChangePasswordType;
}