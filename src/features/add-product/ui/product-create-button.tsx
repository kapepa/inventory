"use client"

import { CirclePlusButton, cn } from "@/shared";
import { useTranslations } from "next-intl";

interface ProductCreateButtonProps {
  isAuthor?: boolean
  className?: string
}

export const ProductCreateButton = ({ className, isAuthor = true }: ProductCreateButtonProps) => {
  if (!isAuthor) return null;
  const t = useTranslations('add-product.buttons');

  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <CirclePlusButton onClick={() => { }} className={cn("size-8", className)} />
      <span className="text-sm text-accent">{t("add-new")}</span>
    </div>
  )
}

ProductCreateButton.displayName = "ProductCreateButton"