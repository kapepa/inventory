"use client"

import { CirclePlusButton, cn } from "@/shared";
import { useTranslations } from "next-intl";
import { useAddProduct } from "../model";

interface ProductCreateButtonProps {
  isAuthor?: boolean
  className?: string,
  parishId: string | null
}

export const ProductCreateButton = ({ parishId, className, isAuthor = true }: ProductCreateButtonProps) => {
  if (!isAuthor || !parishId) return null;
  const t = useTranslations('add-product.buttons');
  const { productCreate } = useAddProduct({ parishId })

  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <CirclePlusButton onClick={productCreate} className={cn("size-8", className)} />
      <span className="text-sm text-accent">{t("add-new")}</span>
    </div>
  )
}

ProductCreateButton.displayName = "ProductCreateButton"