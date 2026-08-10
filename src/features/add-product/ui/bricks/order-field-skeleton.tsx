import { cn } from "@/shared/lib/utils"
import { InputSkeleton, Skeleton } from "@/shared/ui"

export const OrderFieldSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-3.5", className)}>
      <Skeleton className="w-1/3 h-4.5" />
      <InputSkeleton />
    </div>
  )
}

OrderFieldSkeleton.displayName = "OrderFieldSkeleton"