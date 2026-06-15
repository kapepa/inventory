import { cn } from "@/shared"
import { memo, ReactNode } from "react"

interface HeaderCellProps {
  children: ReactNode,
  className?: string,
}

export const HeaderCell = memo(({ children, className }: HeaderCellProps) => {
  return (
    <div className={cn("pb-1.5", className)}>
      <span className="text-xs font-bold text-muted-foreground">{children}</span>
    </div>
  )
})

HeaderCell.displayName = "HeaderCell"