export interface UploadResponse {
  // Responsive image sizes (must match responsive-image.tsx)
  thumbnail: string
  small: string
  medium: string
  large: string
  original: string
  url: string
}

export interface UploadError {
  error: string
}

export interface ResponsiveImageSizes {
  small: string
  medium: string
  large: string
}
