import { AppLocale } from "@/shared";
import { Product, ProductTranslation } from "@prisma/client";

export interface FetchProducts {
  parishId?: string,
  search?: string,
  page?: number,
  limit?: number,
  locale?: AppLocale,
}

export interface FetchProductsClient extends FetchProducts {
  signal?: AbortSignal,
}

export interface ResponseProducts {
  data: ProductsWithRelations[],
  hasMore: boolean,
}

export interface ProductsWithRelations extends Product {
  translations: ProductTranslation[];
}
