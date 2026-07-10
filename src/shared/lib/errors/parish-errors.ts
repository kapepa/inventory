import { ERROR_CODES } from "@/shared";

export class ParishNotFoundError extends Error {
  constructor() {
    super(ERROR_CODES.PARISH_NOT_FOUND_ERROR);
    this.name = 'ParishNotFoundError';
  }
}