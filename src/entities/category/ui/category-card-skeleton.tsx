import { cn } from "@/shared/lib/utils"
import { Loader } from "@/shared/ui/loader"
import { Skeleton } from "@/shared/ui/skeleton"

export const CategoryCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton
      className={cn("h-18.5 border rounded-md bg-card hover:shadow-md border-chart-1 w-full flex justify-center items-center", className)}
    >
      <Loader className="size-8" />
    </Skeleton>
  )
}

CategoryCardSkeleton.displayName = "CategoryCardSkeleton"