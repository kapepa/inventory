import { cn } from "@/shared/lib"
import { Skeleton } from "@/shared/ui"

export const DateCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center gap-y-2", className)}>
      <Skeleton className="h-5 w-[60%] block md:hidden" />
      <Skeleton className="h-4 w-[30%]" />
      <Skeleton className="h-5 w-[60%]" />
    </div>
  )
}

DateCellSkeleton.displayName = "DateCellSkeleton"