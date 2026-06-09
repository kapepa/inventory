import { Category, CategoryTranslation } from "@prisma/client";

export type CategoryTranslationType = Pick<CategoryTranslation, "locale" | "title">;

export interface CategoryWithTranslations extends Category {
  translations: CategoryTranslationType[];
}
