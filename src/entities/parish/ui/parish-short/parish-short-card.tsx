"use client"

import { cn } from "@/shared/lib";
import { memo } from "react";
import { ChevronRight } from "lucide-react";
import { ParishWithRelations } from "../../model/types";
import { CountCell, CountCellSkeleton } from "../cells/count-cell";
import { DateCellDynamic } from "../dynamic/date-cell-dynamic";
import { DateCellSkeleton } from "../skeleton/date-cell-skeleton";
import { DetailsCellSkeleton } from "../skeleton/details-cell-skeleton";
import { DetailsCellDynamic } from "../dynamic/details-cell-dynamic";

interface ParishShortCardProps {
  className?: string,
  parish: ParishWithRelations,
  isActive: boolean,
  selectParishesActions: (id: string) => void,
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
  ({ parish, className, isActive, selectParishesActions }: ParishShortCardProps) => {
    const { title, description } = parish.translations[0]

    return (
      <button
        disabled={isActive}
        onClick={() => { selectParishesActions(parish.id) }}
        className={cn("border rounded-md bg-card hover:shadow-md transition-all cursor-pointer w-full flex overflow-hidden border-chart-1")}
      >
        <div className={cn("px-2 py-3 grow", className)}>
          <DetailsCellDynamic title={title} description={description} />
          <CountCell count={parish._count.products} />
          <DateCellDynamic created={parish.createdAt} delivery={parish.deliveryDate} />
        </div>
        <div className="hidden sm:block w-12 md:w-14">
          <ActiveChevron isActive={isActive} />
        </div>
      </button>

    )
  }
)

ParishShortCard.displayName = 'ParishShortCard';

export const ParishShortCardSkeleton = memo(({ className }: { className?: string }) => {
  return (
    <div className="border rounded-md bg-card w-full flex border-chart-1">
      <div className={cn("grow px-2 py-3.5", className)}>
        <DetailsCellSkeleton />
        <CountCellSkeleton />
        <DateCellSkeleton />
      </div>
      <div className="w-12 md:w-14"></div>
    </div>
  )
})

ParishShortCardSkeleton.displayName = "ParishShortCardSkeleton"