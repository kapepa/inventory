import { User } from "@prisma/client";

export type MiddlewareUser = Pick<User, "id" | "email" | "name" | "role">