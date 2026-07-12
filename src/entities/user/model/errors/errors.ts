import { ERROR_CODES } from "@/shared";

export class AdminAccessRequiredError extends Error {
  constructor() {
    super(ERROR_CODES.ADMIN_ACCESS_REQUIRED_ERROR);
    this.name = 'AdminAccessRequiredError';
  }
}