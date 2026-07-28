import { ERROR_CODES } from "@/shared";

export class AlreadyExistsError extends Error {
  public readonly code = ERROR_CODES.ALREADY_EXISTS;
  public readonly entity: string;

  constructor(entity: string) {
    super(`${entity} already exists`);
    this.name = 'AlreadyExistsError';
    this.entity = entity;
  }
}

export class NotFoundError extends Error {
  public readonly code = ERROR_CODES.NOT_FOUND;
  public readonly entity: string;

  constructor(entity: string) {
    super(`${entity} not found`);
    this.name = 'NotFoundError';
    this.entity = entity;
  }
}

export class HasDependenciesError extends Error {
  public readonly code = ERROR_CODES.HAS_DEPENDENCIES;
  public readonly entity: string;

  constructor(entity: string) {
    super(`${entity} has dependencies`);
    this.name = 'HasDependenciesError';
    this.entity = entity;
  }
}

export class ForbiddenError extends Error {
  public readonly code = ERROR_CODES.FORBIDDEN;

  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class InvalidCredentialsError extends Error {
  public readonly code = ERROR_CODES.INVALID_CREDENTIALS;

  constructor() {
    super('Invalid credentials');
    this.name = 'InvalidCredentialsError';
  }
}

export class InvalidInputError extends Error {
  public readonly code = ERROR_CODES.INVALID_INPUT;

  constructor(message: string) {
    super(message);
    this.name = 'InvalidInputError';
  }
}

export class NotVerifiedError extends Error {
  public readonly code = ERROR_CODES.NOT_VERIFIED;

  constructor() {
    super('Email not verified');
    this.name = 'NotVerifiedError';
  }
}

export class ExpiredError extends Error {
  public readonly code = ERROR_CODES.EXPIRED;
  public readonly entity: string;
  public readonly email?: string;

  constructor(entity: string, email?: string) {
    super(`${entity} expired`);
    this.name = 'ExpiredError';
    this.entity = entity;
    this.email = email;
  }
}

export class EmailSendError extends Error {
  public readonly code = ERROR_CODES.EMAIL_SEND_FAILED;

  constructor(message: string = 'Failed to send email') {
    super(message);
    this.name = 'EmailSendError';
  }
}