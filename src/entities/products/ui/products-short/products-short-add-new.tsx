"use client"

import { CirclePlusButton, cn } from "@/shared";
import { useTranslations } from "next-intl";

interface ProductsShortAddNewProps {
  isAuthor?: boolean
  className?: string
}

export const ProductsShortAddNew = ({ className, isAuthor = true }: ProductsShortAddNewProps) => {
  if (!isAuthor) return null;
  const t = useTranslations('groups');

  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <CirclePlusButton onClick={() => { }} className={cn("size-8", className)} />
      <span className="text-sm text-accent">{t("groups-relations.buttons.add-new")}</span>
    </div>
  )
}

ProductsShortAddNew.displayName = "ProductsShortAddNew"