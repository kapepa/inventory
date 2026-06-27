import { FetchCategories } from "./types";

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

export interface CategoriesProductCountParams extends FetchCategories {
  signal?: AbortSignal,
}