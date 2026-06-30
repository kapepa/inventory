import { AppLocale } from "@/shared";
import { Category, CategoryTranslation } from "@prisma/client";

export interface FetchCategories {
  page: number
  limit: number
  search?: string
  locale?: AppLocale
}

export type CategoryTranslationType = Pick<CategoryTranslation, "locale" | "title">;

export interface CategoryWithTranslations extends Category {
  translations: CategoryTranslationType[];
}

export interface CategoryWithProductCount extends CategoryWithTranslations {
  _count: {
    products: number;
  };
}

export interface FetchCategoryById {
  id: string,
  locale?: AppLocale,
}