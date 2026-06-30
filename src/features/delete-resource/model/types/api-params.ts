interface BaseDeleteParams {
  id: string,
  signal?: AbortSignal,
}

export interface DeleteParishesParams extends BaseDeleteParams { }
export interface DeleteProductParams extends BaseDeleteParams { }
export interface DeleteCategoryParams extends BaseDeleteParams { }