import { ERROR_CODES } from "@/shared";

export class CategoryAlreadyExistsError extends Error {
  constructor() {
    super(ERROR_CODES.CATEGORY_ALREADY_EXISTS);
    this.name = 'CategoryAlreadyExistsError';
  }
}