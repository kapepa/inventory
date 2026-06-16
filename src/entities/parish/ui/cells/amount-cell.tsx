import { cn, formatUAH, formatUSD, Skeleton } from "@/shared"
import { HeaderCell } from "./header-cell";

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
      {label && <HeaderCell className="block md:hidden">{label}</HeaderCell>}
      <div className={cn("flex flex-col items-center", className)}>
        <small suppressHydrationWarning className="text-xs text-sidebar-ring">{USD}</small>
        <span suppressHydrationWarning className="text-base text-chart-2">{UAH}</span>
      </div>
    </div>
  )
}

AmountCell.displayName = "AmountCell"

export const AmountCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center gap-y-2", className)}>
      <Skeleton className="h-5 w-[30%] block md:hidden" />
      <Skeleton className="h-4 w-[40%]" />
      <Skeleton className="h-5 w-[50%]" />
    </div>
  )
}

AmountCellSkeleton.displayName = "AmountCellSkeleton"