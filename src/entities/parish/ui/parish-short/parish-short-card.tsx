import { cn, Link, ROUTES } from "@/shared";
import { ParishWithRelations } from "../../model";
import { CountCell, DateCell, DetailsCell } from "../cells";
import { memo } from "react";
import { ChevronRight } from "lucide-react";

interface ParishShortCardProps {
  className?: string,
  parish: ParishWithRelations,
  isActive?: boolean,
}

export const ParishShortCard = memo(
  ({ parish, className, isActive = false }: ParishShortCardProps) => {
    const { title, description } = parish.translations[0]

    return (
      <div className="relative">
        <Link
          href={`${ROUTES.GROUPS}/:${parish.id}`}
          className={cn("px-2 py-3 border rounded-md bg-card hover:shadow-md transition-all pr-14", className)
          }>
          <DetailsCell title={title} description={description} />
          <CountCell count={parish._count.products} />
          <DateCell created={parish.createdAt} delivery={parish.deliveryDate} />
        </Link>
        <div className={cn(
          "absolute top-0 right-0 bottom-0 w-14 bg-chart-1 rounded-tr-md rounded-br-md flex items-center justify-center invisible",
          isActive && "visible"
        )}>
          <ChevronRight className="size-7 text-background" />
        </div>
      </div>
    )
  }
)

ParishShortCard.displayName = 'ParishShortCard';