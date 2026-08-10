import { cn } from "@/shared/lib/utils"
import { MenuButton, MobileCellLabel } from "@/shared/ui"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { DetailsCellProps } from "../../model/types/types"

export const DetailsCell = ({ label, title, description, className }: DetailsCellProps) => {
  return (
    <div className={cn("", className)} onClick={(e) => {
      e.stopPropagation();
      e.preventDefault()
    }}>
      {label && <MobileCellLabel className="block md:hidden">{label}</MobileCellLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <MenuButton
            aria-label={description?.slice(0, 50) || "Details"}
          />
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

DetailsCell.displayName = "DetailsCell";