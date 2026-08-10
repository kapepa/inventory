import { cn } from "@/shared/lib/utils"
import { Skeleton } from "@/shared/ui/skeleton"

export const PhotoFieldSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-3.5", className)}>
      <Skeleton className="w-1/3 h-4.5" />
      <Skeleton className="w-full aspect-video" />
    </div>
  )
}

PhotoFieldSkeleton.displayName = "PhotoFieldSkeleton"