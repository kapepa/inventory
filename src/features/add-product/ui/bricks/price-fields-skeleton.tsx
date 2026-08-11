import { cn } from "@/shared/lib/utils"
import { InputSkeleton } from "@/shared/ui/input"
import { Skeleton } from "@/shared/ui/skeleton"

export const PriceFieldsSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      <div className="flex flex-col gap-y-3.5">
        <Skeleton className="w-1/3 h-4.5" />
        <InputSkeleton />
      </div>
      <div className="flex flex-col gap-y-3.5">
        <Skeleton className="w-1/3 h-4.5" />
        <InputSkeleton />
      </div>
    </div>
  )
}

PriceFieldsSkeleton.displayName = "PriceFieldsSkeleton"