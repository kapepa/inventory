import { FetchProducts } from "./types";

export interface FetchProductsParams extends FetchProducts {
  signal?: AbortSignal,
}