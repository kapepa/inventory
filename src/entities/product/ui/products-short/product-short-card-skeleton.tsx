import { cn } from "@/shared/lib/utils"
import { Loader, Skeleton } from "@/shared/ui"

export const ProductShortCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("h-16 border-t rounded-none bg-card hover:shadow-md w-full flex justify-center items-center", className)}>
      <Loader className="size-8" />
    </Skeleton>
  )
}

ProductShortCardSkeleton.displayName = "ProductShortCardSkeleton"