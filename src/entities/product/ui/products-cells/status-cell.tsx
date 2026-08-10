import { STATUS_DISPLAY_CONFIG } from "@/shared/lib/get-status-display"
import { cn } from "@/shared/lib/utils"
import { MobileCellLabel } from "@/shared/ui"
import { ProductStatus } from "@prisma/client"
import { useTranslations } from "next-intl"

interface StatusCellProps {
  className?: string
  status: ProductStatus
  label?: string
}

export const StatusCell = ({ label, status, className }: StatusCellProps) => {
  const t = useTranslations('groups-relations.products.status')
  const config = STATUS_DISPLAY_CONFIG[status] || STATUS_DISPLAY_CONFIG.FREE

  return (
    <div className={cn("flex justify-start lg:justify-center flex-col", className)}>
      {label && <MobileCellLabel className="block lg:hidden">{label}</MobileCellLabel>}
      <span className={config.colorClass}>{t(config.labelKey)}</span>
    </div>
  )
}

StatusCell.displayName = "StatusCell"