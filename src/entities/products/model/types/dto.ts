import { ProductsWithRelations } from "./types";

export interface ResponseProductsDTO {
  data: ProductsWithRelations[],
  hasMore: boolean,
}