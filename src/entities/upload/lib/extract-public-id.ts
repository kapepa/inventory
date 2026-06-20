import { ImageSizes } from "@/shared";

export const extractPublicId = (photo: string | ImageSizes): string | null => {
  try {
    let url: string | null = null;

    if (typeof photo === 'string') {
      if (photo.startsWith('{')) {
        try {
          const parsed = JSON.parse(photo) as ImageSizes;
          url = parsed.original || parsed.large || parsed.medium || parsed.small || parsed.thumbnail;
        } catch {
          url = photo;
        }
      } else {
        url = photo;
      }
    } else if (typeof photo === 'object') {
      url = photo.original || photo.large || photo.medium || photo.small || photo.thumbnail;
    }

    if (!url) return null;

    const cleanUrl = url.split('?')[0];
    const parts = cleanUrl.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;

    const afterUpload = parts.slice(uploadIndex + 1);
    const pathParts = afterUpload.filter(part => !part.match(/^[a-z]_/));
    const publicId = pathParts.join('/').replace(/\.[^/.]+$/, '');

    return publicId;
  } catch (error) {
    console.error('Error extracting public_id:', error);
    return null;
  }
};