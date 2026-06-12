import { ImageSizes } from "@/shared"

export interface UploadImageResponse extends ImageSizes { }

export interface UploadImageError {
  error: string
}

export interface ResponsiveImageSizes extends Pick<ImageSizes, "small" | "medium" | "large"> { }
