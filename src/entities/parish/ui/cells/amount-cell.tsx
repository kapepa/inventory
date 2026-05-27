import { cn } from "@/shared"

interface AmountCellProps {
  className?: string
}

export const AmountCell = ({ className }: AmountCellProps) => {
  return (
    <div className={cn("", className)}>
      AmountCell
    </div>
  )
}