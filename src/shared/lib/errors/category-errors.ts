import { ERROR_CODES } from "@/shared";

export class CategoryHasProductsError extends Error {
  constructor() {
    super(ERROR_CODES.CATEGORY_HAS_PRODUCTS);
    this.name = 'CategoryHasProductsError';
  }
}

export class CategoryNotFoundError extends Error {
  constructor() {
    super(ERROR_CODES.CATEGORY_NOT_FOUND_ERROR);
    this.name = 'CategoryNotFoundError';
  }
}

export class CategoryAlreadyExistsError extends Error {
  constructor() {
    super(ERROR_CODES.CATEGORY_ALREADY_EXISTS);
    this.name = 'CategoryAlreadyExistsError';
  }
}