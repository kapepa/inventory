import { cn } from "@/shared/lib"
import { Skeleton } from "@/shared/ui"

export const TitleCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center md:items-start gap-y-2", className)}>
      <Skeleton className="h-5 w-[25%] block md:hidden" />
      <Skeleton className="h-6 w-[50%]" />
    </div>
  )
}

TitleCellSkeleton.displayName = "TitleCellSkeleton"