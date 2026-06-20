export const extractFromUrl = (url: string): string | null => {
  try {
    const cleanUrl = url.split('?')[0];
    const parts = cleanUrl.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;

    const afterUpload = parts.slice(uploadIndex + 1);
    const pathParts = afterUpload.filter(part => !part.match(/^[a-z]_/));
    const publicId = pathParts.join('/').replace(/\.[^/.]+$/, '');

    return publicId || null;
  } catch {
    return null;
  }
};
