"use client"

import Image from "next/image"

import { ImageIcon, LucideIcon } from "lucide-react"
import { Skeleton } from "@/shared/ui/skeleton"
import { memo, useState, ReactNode } from "react"
import { cn, getThumbnailUrl } from "../lib"

interface ThumbnailProps {
  source?: string | null
  alt?: string
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  rounded?: boolean
  objectFit?: "cover" | "contain"
  fallbackIcon?: LucideIcon
  fallback?: ReactNode
  priority?: boolean
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
}

const sizesProp = {
  sm: "32px",
  md: "48px",
  lg: "64px",
  xl: "96px",
}

export const Thumbnail = memo(
  ({
    source,
    alt = "product",
    className,
    size = "md",
    rounded = false,
    objectFit = "cover",
    fallbackIcon: FallbackIcon = ImageIcon,
    fallback,
    priority = false
  }: ThumbnailProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const defaultFallback = (
      <div className="flex flex-col items-center justify-center text-muted-foreground/40">
        <FallbackIcon className="w-5 h-5" strokeWidth={1.5} />
      </div>
    )

    const thumbnailUrl = getThumbnailUrl(source)

    if (!thumbnailUrl) {
      return (
        <div className={cn(
          "relative overflow-hidden bg-muted flex items-center justify-center border shrink-0",
          rounded ? "rounded-full" : "rounded-md",
          sizeMap[size],
          className
        )}>
          {fallback || defaultFallback}
        </div>
      )
    }

    return (
      <div className={cn(
        "relative overflow-hidden bg-muted flex items-center justify-center *:shrink-0",
        rounded ? "rounded-full" : "rounded-md",
        sizeMap[size],
        className
      )}>
        {isLoading && !hasError && (
          <Skeleton className="w-full h-full absolute inset-0 z-10" />
        )}

        {!hasError && (
          <Image
            src={thumbnailUrl}
            alt={alt}
            fill
            sizes={sizesProp[size]}
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

        {hasError && (fallback || defaultFallback)}
      </div>
    )
  })

Thumbnail.displayName = "Thumbnail"