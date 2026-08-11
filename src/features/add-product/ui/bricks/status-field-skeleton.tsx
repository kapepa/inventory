import { cn } from "@/shared/lib/utils"
import { InputSkeleton } from "@/shared/ui/input"
import { Skeleton } from "@/shared/ui/skeleton"

export const StatusFieldSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-3.5", className)}>
      <Skeleton className="w-1/3 h-4.5" />
      <InputSkeleton />
    </div>
  )
}

StatusFieldSkeleton.displayName = "StatusFieldSkeleton"