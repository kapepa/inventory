"use client"

import { ProductWithRelationsShort, ProductWithRelationsWide } from "@/entities/product/model/types";
import { AddProductButtonDynamic } from "./bricks/add-product-button-dynamic";

interface AddProductButtonProps {
  isAuthor?: boolean
  className?: string
  parishId: string | null
  onSuccessAction: (product: ProductWithRelationsWide | ProductWithRelationsShort) => void
}

export const AddProductButton = ({ parishId, className, isAuthor = true, onSuccessAction }: AddProductButtonProps) => {
  if (!isAuthor || !parishId) return null;

  return (
    <AddProductButtonDynamic
      parishId={parishId}
      className={className}
      onSuccessAction={onSuccessAction}
    />
  )
}

AddProductButton.displayName = "AddProductButton"