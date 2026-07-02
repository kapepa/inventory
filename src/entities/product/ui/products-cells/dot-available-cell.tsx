import { cn, Skeleton, STATUS_DISPLAY_CONFIG } from "@/shared"
import { ProductStatus } from "@prisma/client"
import { memo } from "react"

interface DotAvailableCellProps {
  className?: string
  status: ProductStatus
}

export const DotAvailableCell = memo(({ className, status }: DotAvailableCellProps) => {
  const config = STATUS_DISPLAY_CONFIG[status] || STATUS_DISPLAY_CONFIG;

  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div className={cn("w-3 h-3 rounded-full", config.bgClass)}></div>
    </div>
  )
})

DotAvailableCell.displayName = "DotAvailableCell"

export const DotAvailableCellSkeleton = memo(({ className }: { className?: string }) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <Skeleton className="w-3 h-3 rounded-full" />
    </div>
  )
})

DotAvailableCellSkeleton.displayName = "DotAvailableCellSkeleton"