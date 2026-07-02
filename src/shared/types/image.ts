import { ReactNode } from "react";

// Type for a single image URL (Next.js handles optimization)
export type SingleImageSource = {
  url: string;
}

// Type for multiple image URLs (different sizes from backend/Cloudinary)
// This matches the response from upload-service.ts
export type MultipleImageSources = {
  thumbnail?: string; // ~150px - for previews, lists, thumbnails (optional)
  small: string;      // ~640px - for mobile devices (≤480px)
  medium: string;     // ~1024px - for tablets (≤768px)
  large: string;      // ~1920px - for desktop (>1200px)
  original?: string;  // ~2560px - original size (4K/full quality, optional)
  url?: string;       // Main URL (for backwards compatibility)
}

export type ImageSource = SingleImageSource | MultipleImageSources;

export interface ResponsiveImageProps {
  source: ImageSource | string | null | undefined;
  alt?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  objectFit?: "cover" | "contain";
  priority?: boolean;
  fallback?: ReactNode;
  sizes?: string;  // Custom sizes attribute for Next.js Image
  unstyled?: boolean;
}

export interface ImageSizes {
  thumbnail: string
  small: string
  medium: string
  large: string
  original: string
  url: string
}
