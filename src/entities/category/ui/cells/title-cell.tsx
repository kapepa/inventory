import { cn, MobileCellLabel, Skeleton, Tooltip, TooltipContent, TooltipText, TooltipTrigger } from "@/shared"

interface TitleCellProps {
  label?: string,
  title: string,
  className?: string
}

export const TitleCell = ({ label, title, className }: TitleCellProps) => {
  return (
    <div className={cn("", className)}>
      {label && <MobileCellLabel className="block md:hidden">{label}</MobileCellLabel>}
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="block min-w-0 text-center lg:text-left truncate font-medium text-xl text-chart-2 underline decoration-1 underline-offset-5 w-full">
            {title}
          </span>
        </TooltipTrigger>
        <TooltipContent align="start" className="bg-chart-2 border-chart-2">
          <TooltipText>
            {title}
          </TooltipText>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

TitleCell.displayName = "TitleCell"

export const TitleCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-start gap-y-2", className)}>
      <Skeleton className="h-6 w-[50%] m-auto lg:m-0" />
    </div>
  )
}

TitleCellSkeleton.displayName = "TitleCellSkeleton"