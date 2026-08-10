import { cn } from "@/shared/lib/utils"
import { Skeleton } from "@/shared/ui/skeleton"
import { SpecificationInputSkeleton } from "./bricks/specification-input-skeleton"
import { CategorySelectorSkeleton } from "./bricks/category-selector-skeleton"

export const ProductsExploreSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 items-center gap-3", className)}>
      <div className="flex items-center gap-2 w-full flex-col lg:flex-row">
        <Skeleton className="h-4 w-full max-w-10" />
        <CategorySelectorSkeleton />
      </div>
      <div className="flex items-center gap-2 w-full flex-col lg:flex-row">
        <Skeleton className="h-4 w-full max-w-26" />
        <SpecificationInputSkeleton />
      </div>
    </div>
  )
}

ProductsExploreSkeleton.displayName = "ProductsExploreSkeleton"