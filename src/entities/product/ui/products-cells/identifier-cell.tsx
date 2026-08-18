import { cn } from "@/shared/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip"
import { TooltipText } from "@/shared/ui/tooltip-text"
import { memo } from "react"

interface IdentifierCellProps {
  className?: string,
  title: string,
  serialNumber: string,
}

export const IdentifierCell = memo(({ title, serialNumber, className }: IdentifierCellProps) => {
  return (
    <div className={cn("grid items-start justify-center lg:justify-start", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <h3 className="truncate text-start font-normal underline decoration-ring decoration-2">
            {title}
          </h3>
        </TooltipTrigger>
        <TooltipContent align="start" className={cn("bg-chart-2", "border-chart-2")}>
          <TooltipText>
            {title}
          </TooltipText>
        </TooltipContent>
      </Tooltip>
      <div className="flex items-start justify-center lg:justify-start gap-1 text-sm text-muted-foreground min-w-0">
        <span>SN</span> <span className="truncate">{serialNumber}</span>
      </div>
    </div>
  )
}
)

IdentifierCell.displayName = "IdentifierCell"