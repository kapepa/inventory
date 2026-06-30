import { ERROR_CODES } from "@/shared";

export class CategoryHasProductsError extends Error {
  constructor() {
    super(ERROR_CODES.CATEGORY_HAS_PRODUCTS);
    this.name = 'CategoryHasProductsError';
  }
}