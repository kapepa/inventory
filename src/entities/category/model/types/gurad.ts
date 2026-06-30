import { CategoryWithProductCount, CategoryWithTranslations } from "./types";

export function isCategoryWithProductCount(
  category: CategoryWithTranslations | CategoryWithProductCount
): category is CategoryWithProductCount {
  return category && '_count' in category && typeof category._count === 'object';
}