import { cn, Skeleton, Tooltip, TooltipContent, TooltipText, TooltipTrigger } from "@/shared"
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
          <h5 className="truncate text-start font-normal underline decoration-ring decoration-2"> {title} </h5>
        </TooltipTrigger>
        <TooltipContent className={cn("bg-chart-2", "border-chart-2")}>
          <TooltipText>
            {title}
          </TooltipText>
        </TooltipContent>
      </Tooltip>
      <div className="flex items-start justify-center lg:justify-start gap-1 text-sm text-muted-foreground">
        <span>SN</span> <span>{serialNumber}</span>
      </div>
    </div>
  )
}
)

IdentifierCell.displayName = "IdentifierCell"

export const IdentifierCellSkeleton = memo(({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-1 mt-1 items-center lg:items-start", className)}>
      <Skeleton className="h-5 w-[50%]" />
      <div className="flex items-start gap-1 text-sm text-muted-foreground">
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  )
}
)

IdentifierCellSkeleton.displayName = "IdentifierCellSkeleton"