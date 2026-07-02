import { ProductStatusCounts, ProductWithRelationsShort, ProductWithRelationsWide } from "./types";

export interface ResponseProductsWideDTO {
  data: ProductWithRelationsWide[],
  total: number,
  hasMore: boolean,
}

export interface ResponseProductsShortDTO {
  data: ProductWithRelationsShort[],
  total: number,
  hasMore: boolean,
}