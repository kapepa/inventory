import { STATUS_DISPLAY_CONFIG } from "@/shared/lib/get-status-display"
import { cn } from "@/shared/lib/utils"
import { Skeleton } from "@/shared/ui/skeleton"
import { ProductStatus } from "@prisma/client"

interface DotAvailableCellProps {
  className?: string
  status: ProductStatus
}

export const DotAvailableCell = ({ className, status }: DotAvailableCellProps) => {
  const config = STATUS_DISPLAY_CONFIG[status] || STATUS_DISPLAY_CONFIG;

  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div className={cn("w-3 h-3 rounded-full", config.bgClass)}></div>
    </div>
  )
}

DotAvailableCell.displayName = "DotAvailableCell"