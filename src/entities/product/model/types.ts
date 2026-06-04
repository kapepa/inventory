import { AppLocale } from "@/shared";
import { Product, ProductTranslation } from "@prisma/client";

export interface GetProductsByParishId {
  parishId: string,
  page: number;
  limit: number;
  locale: AppLocale
}

export interface GetProductsByParishIdResponse {
  data: ProductWithRelations[],
  hasMore: boolean,
}

export interface ProductWithRelations extends Product {
  translations: ProductTranslation[];
}