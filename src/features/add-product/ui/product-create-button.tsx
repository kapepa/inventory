"use client"

import { CirclePlusButton } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib";
import { ProductWithRelationsShort, ProductWithRelationsWide } from "@/entities/product/model/types";
import { useAddProduct } from "../model/hooks/use-add-product";

interface ProductCreateButtonProps {
  isAuthor?: boolean
  className?: string
  parishId: string | null
  onSuccessAction: (product: ProductWithRelationsWide | ProductWithRelationsShort) => void
}

export const ProductCreateButton = ({ parishId, className, isAuthor = true, onSuccessAction }: ProductCreateButtonProps) => {
  if (!isAuthor || !parishId) return null;
  const t = useTranslations('add-product.buttons');
  const { productCreate, ProductCreateElement } = useAddProduct({ parishId, onSuccessAction })

  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <CirclePlusButton onClick={productCreate} className={cn("size-8", className)} />
      <span className="text-sm text-accent">{t("add-new")}</span>
      {ProductCreateElement}
    </div>
  )
}

ProductCreateButton.displayName = "ProductCreateButton"