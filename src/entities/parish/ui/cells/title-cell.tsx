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
          <span className="font-medium text-xl truncate text-chart-2 underline decoration-1 underline-offset-5">
            {title}
          </span>
        </TooltipTrigger>
        <TooltipContent className=" bg-chart-2 border-chart-2">
          <span className="font-medium text-xs bg-chart-2 border-chart-2">
            {title}
          </span>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}