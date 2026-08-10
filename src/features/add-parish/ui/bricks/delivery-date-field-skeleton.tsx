import { cn } from "@/shared/lib/utils"
import { InputSkeleton, Skeleton } from "@/shared/ui"

export const DeliveryDateFieldSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      <Skeleton className="w-24 h-4.5" />
      <InputSkeleton />
    </div >
  )
}

DeliveryDateFieldSkeleton.displayName = "DeliveryDateFieldSkeleton"