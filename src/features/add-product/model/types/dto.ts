import { Product } from "@prisma/client";
import { ProductPriceType, ProductTranslationType } from "./types";

export interface ProductCreateDTO extends Product {
  translations: ProductTranslationType[]
  prices: ProductPriceType[]
}

export interface CreateProductParams {
  data: ProductCreateDTO,
  signal?: AbortSignal,
}