import { User } from "@prisma/client";

export interface FetchUsers {
  search?: string,
  limit?: number,
  page?: number,
}

export type UserPublic = Pick<User, 'id' | 'name' | 'email' | "imageUrl">;

export interface UsersState {
  total: number | null;
  page: number;
  setPage: (page: number) => void;
  setTotal: (total: number) => void;
  setFull: (props: { total: number; page: number }) => void;
}
