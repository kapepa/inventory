import { cn, Tooltip, TooltipContent, TooltipTrigger } from "@/shared"

interface TitleCellProps {
  title: string,
  className?: string
}

export const TitleCell = ({ title, className }: TitleCellProps) => {
  return (
    <div className={cn("", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="font-medium text-base truncate text-chart-3">
            {title}
          </span>
        </TooltipTrigger>
        <TooltipContent className=" bg-chart-3 border-chart-3">
          <span className="font-medium text-base bg-chart-3 border-chart-3">
            {title}
          </span>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}