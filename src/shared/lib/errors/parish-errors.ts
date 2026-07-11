import { ERROR_CODES } from "@/shared";

export class ParishNotFoundError extends Error {
  constructor() {
    super(ERROR_CODES.PARISH_NOT_FOUND_ERROR);
    this.name = 'ParishNotFoundError';
  }
}

export class ParishAlreadyExistsError extends Error {
  constructor() {
    super(ERROR_CODES.PARISH_ALREADY_EXISTS);
    this.name = 'ParishAlreadyExistsError';
  }
}

export class ParishHasProductsError extends Error {
  constructor() {
    super(ERROR_CODES.PARISH_HAS_PRODUCTS_ERROR);
    this.name = 'ParishHasProductsError';
  }
}