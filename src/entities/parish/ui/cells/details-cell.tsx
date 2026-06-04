import { Button, cn, Popover, PopoverContent, PopoverTrigger } from "@/shared"
import { Menu } from "lucide-react"

interface DetailsCellProps {
  title?: string | null,
  description: string | null,
  className?: string
}

export const DetailsCell = ({ title, description, className }: DetailsCellProps) => {
  return (
    <div className={cn("flex justify-center", className)} onClick={(e) => {
      e.stopPropagation();
      e.preventDefault()
    }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="cursor-pointer size-11 rounded-full" variant="outline">
            <Menu className="size-6 text-chart-3" strokeWidth={3} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-100">
          <div className="flex flex-col gap-y-1">
            {title && <p className="text-sm text-muted-foreground font-semibold">{title}</p>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}