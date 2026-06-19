import { cn, MobileCellLabel, Skeleton, STATUS_DISPLAY_CONFIG } from "@/shared"
import { ProductStatus } from "@prisma/client"
import { useTranslations } from "next-intl"
import { memo } from "react"

interface StatusCellProps {
  className?: string
  status: ProductStatus
  label?: string
}

export const StatusCell = memo(({ label, status, className }: StatusCellProps) => {
  const t = useTranslations('groups.groups-relations.products.status')
  const config = STATUS_DISPLAY_CONFIG[status] || STATUS_DISPLAY_CONFIG.FREE

  return (
    <div className={cn("flex justify-start lg:justify-center flex-col", className)}>
      {label && <MobileCellLabel className="block lg:hidden">{label}</MobileCellLabel>}
      <span className={config.colorClass}>{t(config.labelKey)}</span>
    </div>
  )
}
)

StatusCell.displayName = "StatusCell"

export const StatusCellSkeleton = memo(({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col justify-center items-center", className)}>
      <Skeleton className="h-3.5 w-20 block lg:hidden mb-2" />
      <Skeleton className="h-6 w-20" />
    </div>
  )
}
)

StatusCellSkeleton.displayName = "StatusCellSkeleton"