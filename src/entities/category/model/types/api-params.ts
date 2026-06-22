export interface RequestCategoriesParams {
  signal?: AbortSignal,
}

export interface GetCategoriesParams {
  locale: string;
}

export interface GetCategoriesByParishIdParams extends GetCategoriesParams {
  id: string
}
