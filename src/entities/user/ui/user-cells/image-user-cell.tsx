import { cn } from "@/shared/lib";
import { ProfileAvatar, Skeleton } from "@/shared/ui";
import { memo } from "react";

interface ImageUserCellProps {
  url?: string | null;
  name: string
  className?: string;
}

export const ImageUserCell = memo(({ url, name, className }: ImageUserCellProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <ProfileAvatar url={url} name={name} className="size-20" />
    </div>
  )
})

ImageUserCell.displayName = "ImageUserCell"

export const ImageUserCellSkeleton = memo(({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("size-20 rounded-full", className)} />
  )
})

ImageUserCellSkeleton.displayName = "ImageUserCellSkeleton"