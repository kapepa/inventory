import { AppLocale } from "@/shared";
import { Category, CategoryTranslation, Price, Product, ProductTranslation, Rental, User } from "@prisma/client";

export interface FetchProducts {
  categoryId?: string,
  parishId?: string,
  search?: string,
  page?: number,
  limit?: number,
  locale?: AppLocale,
}

export interface ProductWithRelationsShort extends Product {
  translations: Pick<ProductTranslation, "title" | "specification">[];
  prices: Pick<Price, "value" | "symbol">[]
}

export interface ProductWithRelationsWide extends ProductWithRelationsShort {
  category: Pick<Category & { translations: Pick<CategoryTranslation, "title">[] }, "id" | "translations"> | null
  user: Pick<User, "id" | "name"> | null
  rental: Pick<Rental, "startDate" | "endDate"> | null
}