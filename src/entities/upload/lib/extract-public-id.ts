export const extractPublicId = (url: string): string | null => {
  try {
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');

    if (uploadIndex === -1) return null;

    // public_id starts two elements after “upload” (we skip ‘upload’ and “version”)
    const publicIdWithExtension = parts.slice(uploadIndex + 2).join('/');

    // Remove the file extension (.jpg, .webp, etc.)
    return publicIdWithExtension.replace(/\.[^/.]+$/, "");
  } catch (error) {
    console.error('Error extracting publicId from URL:', error);
    return null;
  }
};