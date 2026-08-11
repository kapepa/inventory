import { cn } from "@/shared/lib/utils"
import { InputSkeleton } from "@/shared/ui/input"
import { Skeleton } from "@/shared/ui/skeleton"

export const DeliveryDateFieldSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      <Skeleton className="w-24 h-4.5" />
      <InputSkeleton />
    </div >
  )
}

DeliveryDateFieldSkeleton.displayName = "DeliveryDateFieldSkeleton"