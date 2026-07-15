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

export class AvatarUpdateForbiddenError extends Error {
  constructor() {
    super(ERROR_CODES.AVATAR_UPDATE_FORBIDDEN);
    this.name = 'AvatarUpdateForbiddenError';
  }
}


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