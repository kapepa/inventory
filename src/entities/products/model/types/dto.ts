import { ProductWithRelationsShort, ProductWithRelationsWide } from "./types";

export interface ResponseProductsWideDTO {
  data: ProductWithRelationsWide[],
  hasMore: boolean,
}

export interface ResponseProductsShortDTO {
  data: ProductWithRelationsShort[],
  hasMore: boolean,
}