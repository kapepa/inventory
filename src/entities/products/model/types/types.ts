import { AppLocale } from "@/shared";
import { Price, Product, ProductTranslation } from "@prisma/client";

export interface FetchProducts {
  parishId?: string,
  search?: string,
  page?: number,
  limit?: number,
  locale?: AppLocale,
}

export interface ProductWithRelations extends Product {
  translations: ProductTranslation[];
  prices: Price[]
}
