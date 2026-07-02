import { User } from "@prisma/client";

export interface FetchUsers {
  search?: string,
  limit?: number,
  page?: number,
}

export type UserPublic = Pick<User, 'id' | 'name' | 'email' | "imageUrl">;