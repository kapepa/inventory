import { cn, formatUAH, formatUSD } from "@/shared"

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