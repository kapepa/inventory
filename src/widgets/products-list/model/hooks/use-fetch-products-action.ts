import { useMemo } from "react";
import { ProductsActionMode } from "../types";
import { requestCategoryProducts } from "@/entities/category/api";
import { FetchProductsParams } from "@/entities/product/model/types";
import { fetchProductsWide } from "@/entities/product/api";

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