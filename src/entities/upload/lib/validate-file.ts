import { IMAGE_MAX_SIZE_BYTES, UPLOAD_LIMITS } from "@/shared/constants";

export const validateFile = (file: File): void => {
  if (!UPLOAD_LIMITS.ALLOWED_TYPES.includes(file.type as any)) {
    throw new Error(`Invalid file type: ${file.type}. Allowed types: ${UPLOAD_LIMITS.ALLOWED_TYPES.join(', ')}`);
  }

  if (file.size > IMAGE_MAX_SIZE_BYTES) {
    const sizeInMB = (file.size / 1024 / 1024).toFixed(2);
    const maxSizeInMB = UPLOAD_LIMITS.IMAGE_MAX_SIZE_MB;
    throw new Error(`File too large: ${sizeInMB}MB. Maximum size: ${maxSizeInMB}MB`);
  }
};