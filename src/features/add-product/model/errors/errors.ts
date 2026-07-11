import { ERROR_CODES } from "@/shared";

export class ProductAlreadyExistsError extends Error {
  constructor() {
    super(ERROR_CODES.PRODUCT_ALREADY_EXISTS);
    this.name = 'ProductAlreadyExists';
  }
}