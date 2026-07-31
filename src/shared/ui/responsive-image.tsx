"use client"

import Image from "next/image"
import { cn, isMultipleSources, isSingleSource, parseResponsiveImage } from "@/shared/lib"
import { ImageIcon } from "lucide-react"
import { Skeleton } from "@/shared/ui/skeleton"
import { memo, useState } from "react"
import { ImageSource, MultipleImageSources, ResponsiveImageProps } from "../types"
import { BREAKPOINTS } from "../constants"

// Maps aspect ratio variants to Tailwind classes
const aspectRatioMap = {
  square: "aspect-square",    // 1:1
  video: "aspect-video",      // 16:9
  portrait: "aspect-[3/4]",   // 3:4
  auto: "",                   // Natural image proportions
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
    unstyled = false,
    sizes = `(max-width: 480px) 100vw, (max-width: 768px) 80vw, (max-width: 1200px) 50vw, (max-width: 1920px) 33vw, 25vw`
  }: ResponsiveImageProps) => {
    // Track loading and error states
    const [isLoading, setIsLoading] = useState(!priority)
    const [hasError, setHasError] = useState(false)

    const normalizedSource: ImageSource | null = (() => {
      if (!source) return null;

      // If it's a string, parse it using parseResponsiveImage
      if (typeof source === 'string') {
        return parseResponsiveImage(source);
      }

      // Otherwise, return it as is
      return source;
    })()

    // Default fallback UI when no image is available
    const defaultFallback = (
      <div
        className="flex flex-col items-center justify-center text-muted-foreground/40 h-full"
        role="img"
        aria-label={alt || "No image available"}
      >
        {/* <span className="text-sm mb-2">{t("no-image")}</span> */}
        <ImageIcon className="w-16 h-16" strokeWidth={1.5} aria-hidden="true" />
      </div>
    )

    // Render fallback if no image source is provided
    if (!normalizedSource) {
      return (
        <div
          className={cn(
            "relative overflow-hidden bg-muted flex items-center justify-center border rounded-lg",
            aspectRatio !== "auto" && aspectRatioMap[aspectRatio],
            className
          )}
          role="img"
          aria-label={alt || "No image available"}
        >
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
              {/* Ultra HD: screens wider than 1920px (4K displays) */}
              {normalizedSource.original && (
                <source
                  media={`(min-width: ${BREAKPOINTS.LARGE_DESKTOP + 1}px)`}
                  srcSet={normalizedSource.original}
                />
              )}
              {/* Desktop: screens wider than 1200px (Full HD) */}
              <source
                media={`(min-width: ${BREAKPOINTS.DESKTOP + 1}px)`}
                srcSet={normalizedSource.large}
              />
              {/* Tablet: screens wider than 768px */}
              <source
                media={`(min-width: ${BREAKPOINTS.TABLET + 1}px)`}
                srcSet={normalizedSource.medium}
              />
              {/* Mobile: screens wider than 480px */}
              <source
                media={`(min-width: ${BREAKPOINTS.MOBILE + 1}px)`}
                srcSet={normalizedSource.small}
              />
              {/* Mobile default: screens ≤480px, or thumbnail if available for data saving */}
              <img
                src={normalizedSource.thumbnail || normalizedSource.small}
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

    // Case 2: Single URL or string — render using Next.js Image component for optimization
    let imageUrl: string;

    if (isSingleSource(normalizedSource)) {
      imageUrl = normalizedSource.url;
    } else if (typeof normalizedSource === 'string') {
      imageUrl = normalizedSource;
    } else {
      // Fallback: use url field from MultipleImageSources for backwards compatibility
      const multipleSource = normalizedSource as MultipleImageSources;
      imageUrl = multipleSource.url || multipleSource.small || '';
    }

    const wrapperClasses = unstyled
      ? "relative w-full h-full" : cn(
        "relative overflow-hidden bg-muted rounded-lg",
        aspectRatio !== "auto" && aspectRatioMap[aspectRatio],
        className
      );

    const showSkeletonLoader = !unstyled && isLoading && !hasError;

    return (
      <div className={wrapperClasses}>
        {/* Show skeleton while loading */}
        {showSkeletonLoader && (
          <Skeleton className="w-full h-full absolute inset-0 z-10" aria-hidden="true" />
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