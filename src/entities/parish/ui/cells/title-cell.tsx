import { cn, Skeleton, Tooltip, TooltipContent, TooltipText, TooltipTrigger } from "@/shared"

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
          <TooltipText>
            {title}
          </TooltipText>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

TitleCell.displayName = "TitleCell"

export const TitleCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("", className)}>
      <Skeleton className="h-6 w-[50%]" />
    </div>
  )
}

TitleCellSkeleton.displayName = "TitleCellSkeleton"