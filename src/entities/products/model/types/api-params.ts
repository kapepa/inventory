import { FetchProducts } from "./types";

export interface FetchProductsParams extends FetchProducts {
  signal?: AbortSignal,
}

export interface RequestDeleteProduct {
  id: string,
  signal?: AbortSignal,
}