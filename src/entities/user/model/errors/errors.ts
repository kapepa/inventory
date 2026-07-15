import { ERROR_CODES } from "@/shared";

export class UserNotFoundError extends Error {
  constructor() {
    super(ERROR_CODES.USER_NOT_FOUND_ERROR);
    this.name = 'UserNotFoundError';
  }
}

export class AdminAccessRequiredError extends Error {
  constructor() {
    super(ERROR_CODES.ADMIN_ACCESS_REQUIRED_ERROR);
    this.name = 'AdminAccessRequiredError';
  }
}