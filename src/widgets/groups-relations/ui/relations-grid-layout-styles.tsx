import { cn } from "@/shared/lib/utils";

type RelationshLayoutType = "default" | "admin" | "user";

export const GROUPS_GRID: Record<RelationshLayoutType, string> = {
  default: "grid gap-x-3 px-5 py-2",
  admin: "grid-cols-[1fr_1fr_6fr] lg:grid-cols-[1fr_1fr_8fr_2fr_1fr]",
  user: "grid-cols-[1fr_1fr_6fr] lg:grid-cols-[1fr_1fr_8fr_2fr]"
};

export const getRelationshLayout = (isAdmin: boolean): string => {
  return cn(
    isAdmin ? GROUPS_GRID.admin : GROUPS_GRID.user,
    GROUPS_GRID.default,
  )
};