import { cn } from "@/shared/lib"
import { Skeleton } from "@/shared/ui"

export const DetailsCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center gap-y-2", className)} >
      <Skeleton className="h-5 w-[25%] block md:hidden" />
      <Skeleton className="size-10 lg:size-11 rounded-full" />
    </div>
  )
}

DetailsCellSkeleton.displayName = "DetailsCellSkeleton"