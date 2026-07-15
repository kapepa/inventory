import { ERROR_CODES } from "@/shared";

export class SamePasswordError extends Error {
  constructor() {
    super(ERROR_CODES.SAME_PASSWORD_ERROR);
    this.name = 'SamePasswordError';
  }
}

export class InvalidPasswordError extends Error {
  constructor() {
    super(ERROR_CODES.INVALID_PASSWORD_ERROR);
    this.name = 'InvalidPasswordError';
  }
}