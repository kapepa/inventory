import { ERROR_CODES } from "@/shared";

export class AvatarUpdateForbiddenError extends Error {
  constructor() {
    super(ERROR_CODES.AVATAR_UPDATE_FORBIDDEN);
    this.name = 'AvatarUpdateForbiddenError';
  }
}