import { cn, formatUAH, formatUSD, Skeleton } from "@/shared"

interface AmountCellProps {
  sumUSD: number,
  sumUAH: number,
  className?: string
}

export const AmountCell = ({ sumUAH, sumUSD, className }: AmountCellProps) => {
  const UAH = formatUAH(sumUAH);
  const USD = formatUSD(sumUSD)
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <small suppressHydrationWarning className="text-xs text-sidebar-ring">{USD}</small>
      <span suppressHydrationWarning className="text-base text-chart-2">{UAH}</span>
    </div>
  )
}

AmountCell.displayName = "AmountCell"

export const AmountCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center gap-y-2", className)}>
      <Skeleton className="h-4 w-[50%]" />
      <Skeleton className="h-5 w-[75%]" />
    </div>
  )
}

AmountCellSkeleton.displayName = "AmountCellSkeleton"