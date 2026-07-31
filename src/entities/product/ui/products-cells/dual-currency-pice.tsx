import { cn } from "@/shared/lib"
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

export const DualCurrencyPriceSkeleton = ({ className }: { className?: string }) => {

  return (
    <div className={cn("flex flex-col justify-center items-center gap-y-2", className)}>
      <Skeleton className="h-3.5 w-20 block lg:hidden mb-2" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-6 w-28" />
    </div>
  )
}

DualCurrencyPriceSkeleton.displayName = "DualCurrencyPriceSkeleton"