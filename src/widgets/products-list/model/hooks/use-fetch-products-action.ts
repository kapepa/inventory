import { useMemo } from "react";
import { fetchProductsWide, requestCategoryProducts, FetchProductsParams } from "@/entities";
import { ProductsActionMode } from "../types";

interface UseFetchProductsActionParams {
  mode?: ProductsActionMode;
  categoryId?: string;
}

export const useFetchProductsAction = ({ mode, categoryId }: UseFetchProductsActionParams) => {
  return useMemo(() => {
    if (mode === 'category' && categoryId) {
      return (params: FetchProductsParams) => {
        const { categoryId: _, ...rest } = params;
        return requestCategoryProducts({ ...rest, categoryId });
      };
    }
    return fetchProductsWide;
  }, [mode, categoryId]);
};