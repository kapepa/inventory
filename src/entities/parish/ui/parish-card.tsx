import { Button, cn } from "@/shared"
import { ParishWithRelations } from "../model/types"
import { Menu } from "lucide-react"
import { TitleCell } from "./cells/title-cell"
import { DetailsCell } from "./cells/details-cell"

interface ParishCardProps {
  parish: ParishWithRelations
  onClick?: (parish: ParishWithRelations) => void
  className?: string
}

export const ParishCard = ({ parish, onClick, className }: ParishCardProps) => {
  const { title, description } = parish.translations[0]

  return (
    <div className={cn("p-6 border rounded-xl bg-card hover:shadow-md transition-all", className)}>
      <TitleCell title={title} />
      <DetailsCell description={description} />

      <div>23 Продукта</div>

      <div className="text-sm">
        04 / 12
        <div className="text-xs text-muted-foreground mt-1">06 / Апр / 2017</div>
      </div>

      <div className="font-bold">
        2 500 $
        <div className="text-xs text-muted-foreground font-normal mt-1">250 000.50 uah</div>
      </div>

      <div className="flex justify-end">
        <button className="text-muted-foreground hover:text-destructive">🗑</button>
      </div>
    </div>
  )
}