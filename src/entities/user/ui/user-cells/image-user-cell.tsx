import { cn, ProfileAvatar, Skeleton } from "@/shared";

interface ImageUserCellProps {
  url?: string | null;
  name: string
  className?: string;
}

export const ImageUserCell = ({ url, name, className }: ImageUserCellProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <ProfileAvatar url={url} name={name} className="size-20" />
    </div>
  )
}

ImageUserCell.displayName = "ImageUserCell"

export const ImageUserCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("size-20 rounded-full", className)} />
  )
}

ImageUserCellSkeleton.displayName = "ImageUserCellSkeleton"