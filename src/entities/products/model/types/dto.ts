import { ProductWithRelations } from "./types";

export interface ResponseProductsDTO {
  data: ProductWithRelations[],
  hasMore: boolean,
}