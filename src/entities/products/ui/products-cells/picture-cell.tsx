"use client"

import { cn, Skeleton, Thumbnail } from "@/shared"

interface PictureCellProps {
  url?: string | null
  alt?: string
  className?: string
}

export const PictureCell = ({ url, alt = "product", className }: PictureCellProps) => {
  return (
    <div className={cn("flex items-center justify-center m-auto", className)}>
      <Thumbnail source={url} alt={alt} className={className} size="md" />
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