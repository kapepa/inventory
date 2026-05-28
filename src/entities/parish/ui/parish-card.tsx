import { cn } from "@/shared"
import Link from "next/link"
import { ParishWithRelations } from "../model/types"
import { TitleCell } from "./cells/title-cell"
import { DetailsCell } from "./cells/details-cell"
import { CountCell } from "./cells/count-cell"
import { DateCell } from "./cells/date-cell"
import { ActionsCell } from "./cells/actions-cell"
import { AmountCell } from "./cells/amount-cell"
import { memo } from "react"

interface ParishCardProps {
  parish: ParishWithRelations
  onDeleteParish?: (parish: ParishWithRelations) => void
  className?: string
}

export const ParishCard = memo(
  ({ parish, onDeleteParish, className }: ParishCardProps) => {
    const { title, description } = parish.translations[0]

    return (
      <Link href={`/:${parish.id}`} className={cn("px-6 py-3 border rounded-xl bg-card hover:shadow-md transition-all", className)}>
        <TitleCell title={title} />
        <DetailsCell description={description} />
        <CountCell count={parish._count.products} />
        <DateCell created={parish.createdAt} delivery={parish.deliveryDate} />
        <AmountCell sumUAH={parish.totals.uah} sumUSD={parish.totals.usd} />
        <ActionsCell isOwner={true} parish={parish} onDeleteParish={onDeleteParish} />
      </Link>
    )
  }
)