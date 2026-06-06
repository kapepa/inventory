import { cn, STATUS_DISPLAY_CONFIG } from "@/shared"
import { ProductStatus } from "@prisma/client"
import { useTranslations } from "next-intl"
import { memo } from "react"

interface StatusCellProps {
  className?: string
  status: ProductStatus
}

export const StatusCell = memo(({ status, className }: StatusCellProps) => {
  const t = useTranslations('groups.groups-relations.products-cells.status')
  const config = STATUS_DISPLAY_CONFIG[status] || STATUS_DISPLAY_CONFIG.FREE

  return (
    <div className={cn("flex justify-center items-center", className)}>
      <span className={config.colorClass}>{t(config.labelKey)}</span>
    </div>
  )
}
)

StatusCell.displayName = "StatusCell"