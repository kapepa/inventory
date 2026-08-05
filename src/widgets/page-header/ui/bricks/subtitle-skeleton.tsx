import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui"

export const SubtitleSkeleton = ({ className }: { className?: string }) => {
  return (
    <>
      <span className="hidden lg:inline">/</span>
      <Skeleton className={cn("h-9 w-1/2", className)} />
    </>
  )
}

SubtitleSkeleton.displayName = "SubtitleSkeleton"