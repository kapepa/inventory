import { cn } from "@/shared/lib/utils";

type ProductsLayoutType = "default" | "admin" | "user";

export const PRODUCTD_GRID: Record<ProductsLayoutType, string> = {
  default: "grid grid-cols-2 lg:gap-8 auto-rows-auto",
  admin: "lg:grid-cols-[1fr_1fr_8fr_3fr_3fr_2fr_2fr_1fr]",
  user: "lg:grid-cols-[1fr_1fr_8fr_3fr_3fr_2fr_2fr]"
};

export const getProductsLayout = (isAdmin: boolean): string => {
  return cn(
    isAdmin ? PRODUCTD_GRID.admin : PRODUCTD_GRID.user,
    PRODUCTD_GRID.default,
  )
};