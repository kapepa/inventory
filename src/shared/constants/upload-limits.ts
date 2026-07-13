export const UPLOAD_LIMITS = {
  AVATAR_MAX_SIZE_MB: 2,
  IMAGE_MAX_SIZE_MB: 5,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp']
} as const;

export const AVATAR_MAX_SIZE_BYTES = UPLOAD_LIMITS.AVATAR_MAX_SIZE_MB * 1024 * 1024;
export const IMAGE_MAX_SIZE_BYTES = UPLOAD_LIMITS.IMAGE_MAX_SIZE_MB * 1024 * 1024;