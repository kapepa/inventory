import { CategoryWithProductCount } from "./types";

export interface GetCategoriesWithProductCountDTO {
  data: CategoryWithProductCount[];
  total: number;
  hasMore: boolean;
}