import { ProductWithRelationsShort, ProductWithRelationsWide } from "@/entities/product/model/types";
import { AddProductButtonDynamic } from "./bricks/add-product-button-dynamic";

interface AddProductButtonProps {
  className?: string
  parishId: string | null
  onSuccessAction: (product: ProductWithRelationsWide | ProductWithRelationsShort) => void
}

export const AddProductButton = ({ parishId, className, onSuccessAction }: AddProductButtonProps) => {
  if (!parishId) return null;

  return (
    <AddProductButtonDynamic
      parishId={parishId}
      className={className}
      onSuccessAction={onSuccessAction}
    />
  )
}

AddProductButton.displayName = "AddProductButton"