import { CategoryFormValues } from "../schemas-client";

export interface CreateCategoryParams {
  data: CategoryFormValues,
  signal?: AbortSignal,
}