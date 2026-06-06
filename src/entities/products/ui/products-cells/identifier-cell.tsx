import { cn, Tooltip, TooltipContent, TooltipText, TooltipTrigger } from "@/shared"
import { memo } from "react"

interface IdentifierCellProps {
  className?: string,
  title: string,
  serialNumber: number,
}

export const IdentifierCell = memo(({ title, serialNumber, className }: IdentifierCellProps) => {
  return (
    <div className={cn("grid items-start", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <h5 className="truncate text-start font-normal underline decoration-ring decoration-2"> {title} </h5>
        </TooltipTrigger>
        <TooltipContent className={cn("bg-chart-2", "border-chart-2")}>
          <TooltipText>
            {title}
          </TooltipText>
        </TooltipContent>
      </Tooltip>
      <div className="flex items-start gap-1 text-sm text-muted-foreground">
        <span>SN</span> <span>{serialNumber}</span>
      </div>
    </div>
  )
}
)

IdentifierCell.displayName = "IdentifierCell"