import { cn } from "@/shared"
import { DotAvailableCellSkeleton, IdentifierCellSkeleton, PictureCellSkeleton, StatusCellSkeleton, ActionsProductCellSkeleton } from "../products-cells"

interface ProductShortCardSkeletonProps {
  className?: string
}

export const ProductShortCardSkeleton = ({ className }: ProductShortCardSkeletonProps) => {
  return (
    <div className={cn("border-t", className)}>
      <DotAvailableCellSkeleton />
      <PictureCellSkeleton />
      <IdentifierCellSkeleton />
      <StatusCellSkeleton />
      <ActionsProductCellSkeleton />
    </div>
  )
}

ProductShortCardSkeleton.displayName = "ProductShortCardSkeleton"