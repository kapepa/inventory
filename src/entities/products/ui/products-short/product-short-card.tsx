import { cn } from "@/shared"
import { ProductsWithRelations } from "../../model"
import { DotAvailableCell, PictureCell, IdentifierCell, StatusCell, ActionsProductCell } from "../products-cells"
import { memo } from "react"

interface ProductShortCardProps {
  className?: string,
  product: ProductsWithRelations
}

export const ProductShortCard = memo(
  ({ product, className }: ProductShortCardProps) => {
    const { title } = product.translations[0]

    return (
      <button
        type="button"
        onClick={() => { }}
        className={cn("grid grid-cols-[1fr_1fr_350px_2fr_1fr] gap-x-3 px-8 py-2 border-t hover:shadow-md transition-all cursor-pointer", className)}
      >
        <DotAvailableCell status={product.status} />
        <PictureCell url={product.photo} alt={title} />
        <IdentifierCell title={title} serialNumber={product.serialNumber} />
        <StatusCell status={product.status} />
        <ActionsProductCell onDeleteActions={() => { }} parish={product} isOwner={true} />
      </button>
    )
  }
)

ProductShortCard.displayName = "ProductShortCard"