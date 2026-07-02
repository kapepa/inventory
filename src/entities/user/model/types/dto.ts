import { UserPublic } from "./types";

export interface ResponseUsersDTO {
  data: UserPublic[],
  total: number,
  hasMore: boolean,
}