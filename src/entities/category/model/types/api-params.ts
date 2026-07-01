import { FetchCategories, FetchCategoryProductsParams } from "./types";

export interface RequestCategoriesParams {
  signal?: AbortSignal,
  locale: string;
}

export interface GetCategoriesParams {
  locale: string;
}

export interface GetCategoriesByParishIdParams extends GetCategoriesParams {
  id: string
}

export interface RequestCategoriesProductsCountParams extends FetchCategories {
  signal?: AbortSignal,
}

export interface RequestCategoryProductsParams extends FetchCategoryProductsParams {
  signal?: AbortSignal,
}