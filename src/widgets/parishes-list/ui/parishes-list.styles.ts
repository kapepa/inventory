import { cn } from "@/shared/lib/utils";

type ParishLayoutType = "default" | "admin" | "user";

export const PARISH_LAYOUTS: Record<ParishLayoutType, string> = {
  default: "items-center pb-4 grid gap-4 grid-cols-2 md:grid-rows-1 md:min-w-[725px]",
  admin: "md:grid-cols-[6fr_1fr_1fr_2fr_2fr_1fr] grid-rows-4",
  user: "md:grid-cols-[6fr_1fr_1fr_2fr_2fr] grid-rows-3"
};

export const getParishLayout = (isAdmin: boolean): string => {
  return cn(
    isAdmin ? PARISH_LAYOUTS.admin : PARISH_LAYOUTS.user,
    PARISH_LAYOUTS.default,
  )
};