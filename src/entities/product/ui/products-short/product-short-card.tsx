import { cn } from "@/shared/lib/utils"
import { memo } from "react"
import { ProductWithRelationsShort } from "../../model/types"
import { DotAvailableCell } from "../products-cells/dot-available-cell"
import { PictureCell } from "../products-cells/picture-cell"
import { IdentifierCell } from "../products-cells/identifier-cell"
import { StatusCell } from "../products-cells/status-cell"
import { ActionsProductCell } from "../products-cells/actions-product-cell"

interface ProductShortCardProps {
  product: ProductWithRelationsShort,
  isAdmin?: boolean,
  className?: string,
  openProductModal: (products: ProductWithRelationsShort) => void
  onDeleteProduct: (products: ProductWithRelationsShort) => void
}

export const ProductShortCard = memo(
  ({ product, isAdmin, className, openProductModal, onDeleteProduct }: ProductShortCardProps) => {
    const { title } = product.translations[0]

    return (
      <button
        type="button"
        onClick={() => openProductModal(product)}
        className={cn("hover:shadow-md transition-all cursor-pointer border-t", className)}
      >
        <DotAvailableCell status={product.status} />
        <PictureCell priority={true} url={product.photo} alt={title} />
        <IdentifierCell title={title} serialNumber={product.serialNumber} />
        <StatusCell status={product.status} className="min-w-24 hidden lg:flex" />
        {isAdmin && <ActionsProductCell onDeleteProduct={() => { onDeleteProduct(product) }} isOwner={true} className="hidden lg:flex" />}
      </button>
    )
  }
)

ProductShortCard.displayName = "ProductShortCard"