import { AppLocale } from "@/shared";
import { Category, CategoryTranslation, Price, Product, ProductStatus, ProductTranslation, Rental, User } from "@prisma/client";

export interface FetchProducts {
  specification?: string,
  categoryId?: string,
  parishId?: string,
  locale?: AppLocale,
  search?: string,
  limit?: number,
  page?: number,
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

export type ProductWithRelations = ProductWithRelationsShort | ProductWithRelationsWide

export type ProductStatusKey = keyof typeof ProductStatus;

export interface ProductStatusCounts extends Record<ProductStatusKey, number> {
  total: number;
}