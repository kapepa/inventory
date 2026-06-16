import { cn } from "@/shared"
import { DotAvailableCellSkeleton, IdentifierCellSkeleton, PictureCellSkeleton, StatusCellSkeleton, ActionsProductCellSkeleton } from "../products-cells"

interface ProductShortCardSkeletonProps {
  className?: string
}

export const ProductShortCardSkeleton = ({ className }: ProductShortCardSkeletonProps) => {
  return (
    <div className={cn("border-t w-full", className)}>
      <DotAvailableCellSkeleton />
      <PictureCellSkeleton />
      <IdentifierCellSkeleton />
      <StatusCellSkeleton className="hidden lg:flex" />
      <ActionsProductCellSkeleton className="hidden lg:flex" />
    </div>
  )
}

ProductShortCardSkeleton.displayName = "ProductShortCardSkeleton"