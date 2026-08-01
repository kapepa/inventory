import { useTranslations } from "next-intl";
import { useAddProduct } from "../../model/hooks/use-add-product";
import { CirclePlusButton } from "@/shared/ui";
import { ProductWithRelationsShort, ProductWithRelationsWide } from "@/entities/product/model/types";
import { cn } from "@/shared/lib";

interface AddProductButtonContentProps {
  className?: string
  parishId: string
  onSuccessAction: (product: ProductWithRelationsWide | ProductWithRelationsShort) => void
}

export const AddProductButtonContent = ({ className, parishId, onSuccessAction }: AddProductButtonContentProps) => {
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

AddProductButtonContent.displayName = "AddProductButtonContent"