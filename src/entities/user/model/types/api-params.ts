import { FetchUsers } from "./types";

export interface FetchUsersParams extends FetchUsers {
  signal?: AbortSignal,
}