import { memo } from "react"
import { useTranslations } from "next-intl"
import { ROUTES } from "@/shared/constants/routes"
import { Link } from "@/shared/lib/i18n/routing"
import { ParishWithRelationsTotals } from "../../model/types"
import { cn } from "@/shared/lib/utils"
import { CountCell, CountCellSkeleton } from "../cells/count-cell"
import { AmountCell, AmountCellSkeleton } from "../cells/amount-cell"
import { ActionsCell, ActionsCellSkeleton } from "../cells/actions-cell"
import { TitleCell, TitleCellSkeleton } from "../cells/title-cell"
import { DetailsCell, DetailsCellSkeleton } from "../cells/details-cell"
import { DateCell, DateCellSkeleton } from "../cells/date-cell"


const CELL_GENERAL_STYLE = "flex flex-col items-center"

interface ParishWideCardProps {
  parish: ParishWithRelationsTotals
  isAdmin?: boolean,
  className?: string
  onDeleteParish: (parish: ParishWithRelationsTotals) => void
}

export const ParishWideCard = memo(
  ({ parish, isAdmin, className, onDeleteParish }: ParishWideCardProps) => {
    const t = useTranslations('parish.list.header');
    const { title, description } = parish.translations[0]

    return (
      <Link
        href={`${ROUTES.PARISHES}/${parish.id}`}
        className={cn("px-4 py-2 lg:px-6 lg:py-3 gap-2 border rounded-md bg-card hover:shadow-md transition-all border-chart-1", className)}
      >
        <TitleCell title={title} label={t("name")} className={cn("col-span-2 md:col-span-1", CELL_GENERAL_STYLE)} />
        <DetailsCell description={description} label={t("details")} className={CELL_GENERAL_STYLE} />
        <CountCell count={parish._count.products} label={t("count")} className={cn(CELL_GENERAL_STYLE, "md:items-start")} />
        <DateCell created={parish.createdAt} delivery={parish.deliveryDate} label={t("date")} className={CELL_GENERAL_STYLE} />
        <AmountCell sumUAH={parish.totals.uah} sumUSD={parish.totals.usd} label={t("amount")} className={CELL_GENERAL_STYLE} />
        {isAdmin && <ActionsCell isOwner={isAdmin} onDeleteParish={() => { onDeleteParish(parish) }} label={t("delete")} className={CELL_GENERAL_STYLE} />}
      </Link>
    )
  }
)

ParishWideCard.displayName = "ParishWideCard"

export const ParishWideCardSkeleton = ({ isAdmin, className }: { isAdmin?: boolean, className?: string }) => {
  return (
    <div className={cn("px-5 py-3 lg:px-6 lg:py-3.5 gap-2 border rounded-md bg-card border-chart-1", className)}>
      <TitleCellSkeleton className="col-span-2 md:col-span-1" />
      <DetailsCellSkeleton />
      <CountCellSkeleton />
      <DateCellSkeleton />
      <AmountCellSkeleton />
      {isAdmin && <ActionsCellSkeleton />}
    </div>
  )
}

ParishWideCardSkeleton.displayName = "ParishWideCardSkeleton";