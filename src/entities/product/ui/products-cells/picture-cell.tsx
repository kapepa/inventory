"use client"

import { cn } from "@/shared/lib/utils"
import { Skeleton, Thumbnail } from "@/shared/ui"

interface PictureCellProps {
  url?: string | null
  alt?: string
  className?: string
  priority?: boolean
}

export const PictureCell = ({ priority = false, url, alt = "product", className }: PictureCellProps) => {
  return (
    <div className={cn("flex items-center justify-center m-auto", className)}>
      <Thumbnail priority={priority} source={url} alt={alt} className={className} size="md" />
    </div>
  )
}

PictureCell.displayName = "PictureCell"

export const PictureCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Skeleton className="size-12" />
    </div>
  )
}

PictureCellSkeleton.displayName = "PictureCellSkeleton"