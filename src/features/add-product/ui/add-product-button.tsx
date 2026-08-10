import { ProductWithRelationsShort, ProductWithRelationsWide } from "@/entities/product/model/types";
import { AddProductButtonContent } from "./bricks/add-product-button-content";

interface AddProductButtonProps {
  className?: string
  parishId: string | null
  onSuccessAction: (product: ProductWithRelationsWide | ProductWithRelationsShort) => void
}

export const AddProductButton = ({ parishId, className, onSuccessAction }: AddProductButtonProps) => {
  if (!parishId) return null;

  return (
    <AddProductButtonContent
      parishId={parishId}
      className={className}
      onSuccessAction={onSuccessAction}
    />
  )
}

AddProductButton.displayName = "AddProductButton"