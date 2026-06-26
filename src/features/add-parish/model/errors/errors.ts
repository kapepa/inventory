import { ERROR_CODES } from "@/shared";

export class ParishAlreadyExistsError extends Error {
  constructor() {
    super(ERROR_CODES.PARISH_ALREADY_EXISTS);
    this.name = 'ParishAlreadyExistsError';
  }
}