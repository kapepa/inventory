import { cn, Link, ROUTES } from "@/shared"
import { memo } from "react"
import { ParishWithRelations } from "../../model"
import { ActionsCell, AmountCell, CountCell, DateCell, DetailsCell, TitleCell } from "../cells"

interface ParishWideCardProps {
  parish: ParishWithRelations
  onDeleteParish?: (parish: ParishWithRelations) => void
  className?: string
}

export const ParishWideCard = memo(
  ({ parish, onDeleteParish, className }: ParishWideCardProps) => {
    const { title, description } = parish.translations[0]

    return (
      <Link href={`${ROUTES.GROUPS}/${parish.id}`} className={cn("px-6 py-3 border rounded-md bg-card hover:shadow-md transition-all", className)}>
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