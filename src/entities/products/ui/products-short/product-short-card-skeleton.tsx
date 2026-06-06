import { cn } from "@/shared"

interface ProductShortCardSkeletonProps {
  className?: string
}

export const ProductShortCardSkeleton = ({ className }: ProductShortCardSkeletonProps) => {
  return (
    <div className={cn("", className)}>
      ProductShortCardSkeleton
    </div>
  )
}

ProductShortCardSkeleton.displayName = "ProductShortCardSkeleton"