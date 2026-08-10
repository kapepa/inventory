import { cn } from "@/shared/lib/utils"
import { Skeleton } from "@/shared/ui/skeleton"

export const UserCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton
      className={cn(
        "border rounded-md bg-card hover:shadow-md transition-all w-full border-chart-1",
        "px-4 lg:px-6 py-3 lg:py-4 gap-3",
        className
      )}
    />
  )
}


UserCardSkeleton.displayName = "UserCardSkeleton"