import { AppLocale } from "@/shared";
import { Price, Product, ProductTranslation } from "@prisma/client";

export interface FetchProducts {
  parishId?: string,
  search?: string,
  page?: number,
  limit?: number,
  locale?: AppLocale,
}

export interface ProductsWithRelations extends Product {
  translations: ProductTranslation[];
  prices: Pick<Price, "value" | "symbol">[]
}
