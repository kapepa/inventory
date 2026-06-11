import { UPLOAD_LIMITS } from "../constants";

export const validateFile = (file: File): void => {
  if (!UPLOAD_LIMITS.ALLOWED_TYPES.includes(file.type as any)) {
    throw new Error(`Invalid file type: ${file.type}. Allowed types: ${UPLOAD_LIMITS.ALLOWED_TYPES.join(', ')}`);
  }

  if (file.size > UPLOAD_LIMITS.MAX_SIZE) {
    const sizeInMB = (file.size / 1024 / 1024).toFixed(2);
    const maxSizeInMB = UPLOAD_LIMITS.MAX_SIZE / 1024 / 1024;
    throw new Error(`File too large: ${sizeInMB}MB. Maximum size: ${maxSizeInMB}MB`);
  }
};