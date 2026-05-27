import { cn } from "@/shared"

interface ActionsCellProps {
  className?: string
}

export const ActionsCell = ({ className }: ActionsCellProps) => {
  return (
    <div className={cn("", className)}>
      ActionsCell
    </div>
  )
}