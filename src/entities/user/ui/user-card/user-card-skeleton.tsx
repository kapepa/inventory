import { cn } from "@/shared/lib/utils"
import { Skeleton } from "@/shared/ui/skeleton"

export const UserCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton
      className={cn(
        "border rounded-md bg-card hover:shadow-md transition-all w-full border-chart-1 h-52 md:h-32",
        className
      )}
    />
  )
}


UserCardSkeleton.displayName = "UserCardSkeleton"