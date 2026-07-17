interface BaseDeleteParams {
  id: string,
  signal?: AbortSignal,
}

export interface DeleteParishesParams extends BaseDeleteParams { }
export interface DeleteProductParams extends BaseDeleteParams { }
export interface DeleteCategoryParams extends BaseDeleteParams { }
export interface DeleteAccountParams extends Exclude<BaseDeleteParams, "id"> { }