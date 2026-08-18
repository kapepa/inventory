import { ProductCreateInput } from "./types";

export interface CreateProductParams {
  data: ProductCreateInput,
  signal?: AbortSignal,
}