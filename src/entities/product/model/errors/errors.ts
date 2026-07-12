import { ERROR_CODES } from "@/shared";

export class ProductNotFoundError extends Error {
  constructor() {
    super(ERROR_CODES.PRODUCT_NOT_FOUND_ERROR);
    this.name = 'ProductNotFoundError';
  }
}