import { formatUAH, formatUSD } from "@/shared/lib/currency";
import { cn } from "@/shared/lib/utils"
import { MobileCellLabel } from "@/shared/ui/mobile-cell-label"

interface AmountCellProps {
  label?: string,
  sumUSD: number,
  sumUAH: number,
  className?: string
}

export const AmountCell = ({ label, sumUAH, sumUSD, className }: AmountCellProps) => {
  const UAH = formatUAH(sumUAH);
  const USD = formatUSD(sumUSD)

  return (
    <div className={cn("", className)}>
      {label && <MobileCellLabel className="block md:hidden">{label}</MobileCellLabel>}
      <div className={cn("flex flex-col items-center", className)}>
        <small suppressHydrationWarning className="text-xs text-sidebar-ring">{USD}</small>
        <span suppressHydrationWarning className="text-base text-chart-2">{UAH}</span>
      </div>
    </div>
  )
}

AmountCell.displayName = "AmountCell"
