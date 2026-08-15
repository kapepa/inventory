import { FetchProductsParams } from "@/entities/product/model/types";
import { AppLocale } from "@/shared/lib/i18n/config";
import { Category, CategoryTranslation } from "@prisma/client";

export interface FetchCategories {
  page: number
  limit: number
  search?: string
  locale?: AppLocale
}

export interface FetchCategoryProductsParams extends FetchProductsParams { }

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

export interface CategoriesState {
  total: number | null;
  page: number;
  newCategory: CategoryWithTranslations | null;
  addNewCategory: (category: CategoryWithTranslations | null) => void;
  setPage: (page: number) => void;
  setTotal: (total: number) => void;
  setFull: (props: { total: number; page: number }) => void;
}