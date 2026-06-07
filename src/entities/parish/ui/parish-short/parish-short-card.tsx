"use client"

import { cn } from "@/shared";
import { ParishWithRelations } from "../../model";
import { CountCell, CountCellSkeleton, DateCell, DateCellSkeleton, DetailsCell, DetailsCellSkeleton } from "../cells";
import { memo } from "react";
import { ChevronRight } from "lucide-react";

interface ParishShortCardProps {
  className?: string,
  parish: ParishWithRelations,
  isActive: boolean,
  selectParishesActions: (id: string) => void,
}

const ActiveChevron = memo(({ isActive }: { isActive: boolean }) => {
  return (
    <div className={cn(
      "absolute top-0 right-0 bottom-0 w-14 bg-chart-1 rounded-tr-md rounded-br-md flex items-center justify-center transition-opacity",
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
      <div className="relative">
        <button
          disabled={isActive}
          onClick={() => { selectParishesActions(parish.id) }}
          className={cn("px-2 py-3 border rounded-md bg-card hover:shadow-md transition-all cursor-pointer w-full pr-14", className)
          }>
          <DetailsCell title={title} description={description} />
          <CountCell count={parish._count.products} />
          <DateCell created={parish.createdAt} delivery={parish.deliveryDate} />
        </button>
        <ActiveChevron isActive={isActive} />
      </div>
    )
  }
)

ParishShortCard.displayName = 'ParishShortCard';

export const ParishShortCardSkeleton = memo(({ className }: { className?: string }) => {
  return (
    <div className={cn("px-2 py-3 border rounded-md bg-card", className)}>
      <DetailsCellSkeleton />
      <CountCellSkeleton />
      <DateCellSkeleton />
    </div>
  )
})

ParishShortCardSkeleton.displayName = "ParishShortCardSkeleton"