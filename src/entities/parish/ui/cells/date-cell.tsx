import { cn } from "@/shared"

interface DateCellProps {
  className?: string
}

export const DateCell = ({ className }: DateCellProps) => {
  return (
    <div className={cn("", className)}>
      DateCell
    </div>
  )
}