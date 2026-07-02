import { cn } from "@/shared"
import { ProductWithRelationsShort } from "../../model"
import { DotAvailableCell, PictureCell, IdentifierCell, StatusCell, ActionsProductCell } from "../products-cells"
import { DotAvailableCellSkeleton, IdentifierCellSkeleton, PictureCellSkeleton, StatusCellSkeleton, ActionsProductCellSkeleton } from "../products-cells"

import { memo } from "react"

interface ProductShortCardProps {
  className?: string,
  product: ProductWithRelationsShort,
  openProductModal: (products: ProductWithRelationsShort) => void
  onDeleteProduct: (products: ProductWithRelationsShort) => void
}

export const ProductShortCard = memo(
  ({ product, className, openProductModal, onDeleteProduct }: ProductShortCardProps) => {
    const { title } = product.translations[0]

    return (
      <button
        type="button"
        onClick={() => openProductModal(product)}
        className={cn("hover:shadow-md transition-all cursor-pointer border-t", className)}
      >
        <DotAvailableCell status={product.status} />
        <PictureCell url={product.photo} alt={title} />
        <IdentifierCell title={title} serialNumber={product.serialNumber} />
        <StatusCell status={product.status} className="min-w-24 hidden lg:flex" />
        <ActionsProductCell onDeleteProduct={() => { onDeleteProduct(product) }} isOwner={true} className="hidden lg:flex" />
      </button>
    )
  }
)

ProductShortCard.displayName = "ProductShortCard"

interface ProductShortCardSkeletonProps {
  className?: string
}

export const ProductShortCardSkeleton = ({ className }: ProductShortCardSkeletonProps) => {
  return (
    <div className={cn("border-t w-full", className)}>
      <DotAvailableCellSkeleton />
      <PictureCellSkeleton />
      <IdentifierCellSkeleton />
      <StatusCellSkeleton className="hidden lg:flex" />
      <ActionsProductCellSkeleton className="hidden lg:flex" />
    </div>
  )
}

ProductShortCardSkeleton.displayName = "ProductShortCardSkeleton"