import { cn } from "@/shared/lib/utils"
import { MobileCellLabel, Skeleton } from "@/shared/ui"

interface DualCurrencyPriceProps {
  className?: string
  label?: string
  sumUAH?: number | string
  sumUSD?: number | string
}

export const DualCurrencyPrice = ({ label, sumUAH, sumUSD, className }: DualCurrencyPriceProps) => {
  return (
    <div className={cn("", className)}>
      {label && <MobileCellLabel className="block lg:hidden">{label}</MobileCellLabel>}
      <div className={cn("flex flex-col items-center", className)}>
        <small suppressHydrationWarning className="text-xs text-sidebar-ring">
          {sumUSD ?? "—"}
        </small>
        <span suppressHydrationWarning className="text-sm sm:text-base text-chart-2">
          {sumUAH ?? "—"}
        </span>
      </div>
    </div>
  )
}

DualCurrencyPrice.displayName = "DualCurrencyPrice"