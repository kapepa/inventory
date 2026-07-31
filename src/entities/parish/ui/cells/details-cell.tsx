import { cn } from "@/shared/lib"
import { Button, MobileCellLabel, Skeleton } from "@/shared/ui"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { Menu } from "lucide-react"

interface DetailsCellProps {
  label?: string,
  title?: string | null,
  description: string | null,
  className?: string
}
"flex flex-col items-center md:items-start"
export const DetailsCell = ({ label, title, description, className }: DetailsCellProps) => {
  return (
    <div className={cn("", className)} onClick={(e) => {
      e.stopPropagation();
      e.preventDefault()
    }}>
      {label && <MobileCellLabel className="block md:hidden">{label}</MobileCellLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            asChild
            className="cursor-pointer size-11 rounded-full"
            variant="outline"
            aria-label={description?.slice(0, 50) || "Details"}
          >
            <Menu
              className="size-6 text-chart-3"
              strokeWidth={3}
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 lg:w-100">
          <div className="flex flex-col gap-y-1">
            {title && <p className="text-sm text-muted-foreground font-semibold">{title}</p>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

DetailsCell.displayName = "DetailsCell"

export const DetailsCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center gap-y-2", className)} >
      <Skeleton className="h-5 w-[25%] block md:hidden" />
      <Skeleton className="size-10 lg:size-11 rounded-full" />
    </div>
  )
}

DetailsCellSkeleton.displayName = "DetailsCellSkeleton"