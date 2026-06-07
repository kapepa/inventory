"use client"

import Image from "next/image"
import { cn } from "@/shared"
import { ImageIcon } from "lucide-react"
import { Skeleton } from "@/shared/ui/skeleton"
import { memo, useState, ReactNode } from "react"

// Type for a single image URL (Next.js handles optimization)
type SingleImageSource = {
  url: string;
}

// Type for multiple image URLs (different sizes from backend)
type MultipleImageSources = {
  small: string;   // for mobile devices (≤768px)
  medium: string;  // for tablets (≤1200px)
  large: string;   // for desktops (>1200px)
}

type ImageSource = SingleImageSource | MultipleImageSources;

interface ResponsiveImageProps {
  source: ImageSource | string;  // Accepts an object or a plain string
  alt?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  objectFit?: "cover" | "contain";
  priority?: boolean;
  fallback?: ReactNode;
  sizes?: string;  // Custom sizes attribute for Next.js Image
}

// Maps aspect ratio variants to Tailwind classes
const aspectRatioMap = {
  square: "aspect-square",    // 1:1
  video: "aspect-video",      // 16:9
  portrait: "aspect-[3/4]",   // 3:4
  auto: "",                   // Natural image proportions
}

// Type guard to check if the source has multiple sizes
const isMultipleSources = (source: ImageSource): source is MultipleImageSources => {
  return typeof source === "object" && "small" in source && "medium" in source && "large" in source;
}

// Type guard to check if the source has a single URL
const isSingleSource = (source: ImageSource): source is SingleImageSource => {
  return typeof source === "object" && "url" in source;
}

export const ResponsiveImage = memo(
  ({
    source,
    alt = "image",
    className,
    aspectRatio = "auto",
    objectFit = "cover",
    priority = false,
    fallback,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  }: ResponsiveImageProps) => {
    // Track loading and error states
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    // Default fallback UI when no image is available
    const defaultFallback = (
      <div className="flex flex-col items-center justify-center text-muted-foreground/40">
        <ImageIcon className="w-16 h-16" strokeWidth={1.5} />
        <span className="text-sm mt-2">No image</span>
      </div>
    )

    // Normalize source: convert string to SingleImageSource, return null if empty
    const normalizedSource: ImageSource | null = (() => {
      if (!source) return null;
      if (typeof source === "string") return { url: source };
      return source;
    })();

    // Render fallback if no image source is provided
    if (!normalizedSource) {
      return (
        <div className={cn(
          "relative overflow-hidden bg-muted flex items-center justify-center border rounded-lg",
          aspectRatio !== "auto" && aspectRatioMap[aspectRatio],
          className
        )}>
          {fallback || defaultFallback}
        </div>
      )
    }

    // Case 1: Multiple image URLs — render using <picture> element for responsive images
    if (isMultipleSources(normalizedSource)) {
      return (
        <div className={cn(
          "relative overflow-hidden bg-muted rounded-lg",
          aspectRatio !== "auto" && aspectRatioMap[aspectRatio],
          className
        )}>
          {/* Show skeleton while loading */}
          {isLoading && !hasError && (
            <Skeleton className="w-full h-full absolute inset-0 z-10" />
          )}

          {!hasError && (
            <picture className="w-full h-full">
              {/* Desktop: screens wider than 1200px */}
              <source
                media="(min-width: 1200px)"
                srcSet={normalizedSource.large}
              />
              {/* Tablet: screens wider than 768px */}
              <source
                media="(min-width: 768px)"
                srcSet={normalizedSource.medium}
              />
              {/* Mobile: default image (screens smaller than 768px) */}
              <img
                src={normalizedSource.small}
                alt={alt}
                className={cn(
                  "w-full h-full transition-opacity duration-300",
                  objectFit === "cover" ? "object-cover" : "object-contain"
                )}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false)
                  setHasError(true)
                }}
              />
            </picture>
          )}

          {/* Show fallback if image fails to load */}
          {hasError && (fallback || defaultFallback)}
        </div>
      )
    }

    // Case 2: Single URL — render using Next.js Image component for optimization
    const imageUrl = isSingleSource(normalizedSource) ? normalizedSource.url : normalizedSource;

    return (
      <div className={cn(
        "relative overflow-hidden bg-muted rounded-lg",
        aspectRatio !== "auto" && aspectRatioMap[aspectRatio],
        className
      )}>
        {/* Show skeleton while loading */}
        {isLoading && !hasError && (
          <Skeleton className="w-full h-full absolute inset-0 z-10" />
        )}

        {!hasError && (
          <Image
            src={imageUrl as string}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "transition-opacity duration-300",
              objectFit === "cover" ? "object-cover" : "object-contain"
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
          />
        )}

        {/* Show fallback if image fails to load */}
        {hasError && (fallback || defaultFallback)}
      </div>
    )
  })

// Set display name for React DevTools
ResponsiveImage.displayName = "ResponsiveImage"