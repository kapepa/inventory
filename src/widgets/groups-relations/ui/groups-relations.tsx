"use client"

import { ProductWithRelations } from "@/entities/product"
import { cn } from "@/shared"
import { useTranslations } from "next-intl"

interface GroupsRelationsProps {
  className?: string
  initialHasMore?: boolean,
  initialProduct?: ProductWithRelations[]
}

export const GroupsRelations = ({ className, initialHasMore, initialProduct }: GroupsRelationsProps) => {
  const t = useTranslations('groups');
  if (!initialProduct) return (
    <div>{t("groups-relations.parishes-not-selected")}</div>
  )


  return (
    <div className={cn(className)}>
      GroupsRelations
    </div>
  )
}

GroupsRelations.displayName = "GroupsRelations"