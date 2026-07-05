import { ERROR_CODES } from "@/shared";

export class UserAlreadyExistsError extends Error {
  constructor() {
    super(ERROR_CODES.USER_ALREADY_EXISTS_ERROR);
    this.name = 'UserAlreadyExistsError';
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super(ERROR_CODES.INVALID_CREDENTIALS_ERROR);
    this.name = 'InvalidCredentialsError';
  }
}