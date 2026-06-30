import { CategoryFormValues } from "../schemas";

export interface CreateCategoryParams {
  data: CategoryFormValues,
  signal?: AbortSignal,
}