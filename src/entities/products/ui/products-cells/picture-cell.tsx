"use client"

import { cn, Thumbnail } from "@/shared"

interface PictureCellProps {
  url?: string | null
  alt?: string
  className?: string
}

export const PictureCell = ({ url, alt = "product", className }: PictureCellProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Thumbnail url={url} alt={alt} className={className} size="md" />
    </div>
  )
}

PictureCell.displayName = "PictureCell"