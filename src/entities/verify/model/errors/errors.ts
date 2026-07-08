import { ERROR_CODES } from "@/shared";

export class TokenExpiredError extends Error {
  public email: string;

  constructor(email: string) {
    super(ERROR_CODES.TOKEN_EXPIRED_ERROR);
    this.name = 'TokenExpiredError';
    this.email = email;
  }
}

export class TokenNotFoundError extends Error {
  constructor() {
    super(ERROR_CODES.VERIFICATION_TOKEN_NOT_FOUND);
    this.name = 'TokenNotFoundError';
  }
}
