import { ERROR_CODES } from "@/shared";


export class VerificationCodeNotFoundError extends Error {
  constructor() {
    super(ERROR_CODES.VERIFICATION_CODE_NOT_FOUND_ERROR);
    this.name = 'VerificationCodeNotFoundError';
  }
}