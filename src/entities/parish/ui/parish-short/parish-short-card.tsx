"use client"

import { cn } from "@/shared/lib/utils";
import { memo } from "react";
import { ChevronRight } from "lucide-react";
import { ParishWithRelations } from "../../model/types";
import { CountCell } from "../cells/count-cell";
import { DetailsCell } from "../cells/details-cell";
import { DateCell } from "../cells/date-cell";
import { Link } from "@/shared/lib/i18n/routing";
import { ROUTES } from "@/shared/constants/routes";

interface ParishShortCardProps {
  id: string,
  className?: string,
  parish: ParishWithRelations,
  isActive: boolean,
}

const ActiveChevron = memo(({ isActive }: { isActive: boolean }) => {
  return (
    <div className={cn(
      "bg-chart-1 flex items-center justify-center transition-opacity h-full",
      isActive ? "visible opacity-100" : "invisible opacity-0"
    )}>
      <ChevronRight className="size-7 text-background" />
    </div>
  )
})

export const ParishShortCard = memo(
  ({ id, parish, className, isActive }: ParishShortCardProps) => {
    const { title, description } = parish.translations[0]

    return (
      <Link
        href={`${ROUTES.GROUPS}/${id}`}
        prefetch
        className={cn("border rounded-md bg-card hover:shadow-md transition-all cursor-pointer w-full flex overflow-hidden border-chart-1")}
      >
        <div className={cn("px-2 py-3 grow", className)}>
          <DetailsCell title={title} description={description} />
          <CountCell count={parish._count.products} />
          <DateCell created={parish.createdAt} delivery={parish.deliveryDate} />
        </div>
        <div className="hidden sm:block w-12 md:w-14">
          <ActiveChevron isActive={isActive} />
        </div>
      </Link>

    )
  }
)

ParishShortCard.displayName = 'ParishShortCard';