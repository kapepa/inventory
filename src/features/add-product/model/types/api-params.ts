import { ProductCreate } from "./types";

export interface CreateProductParams {
  data: ProductCreate,
  signal?: AbortSignal,
}