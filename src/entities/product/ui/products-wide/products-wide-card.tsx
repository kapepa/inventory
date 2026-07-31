"use client"

import { memo } from "react"
import { cn, getProductPrimaryPrice } from "@/shared/lib"
import { ActionsProductCell, ActionsProductCellSkeleton, ConditionCell, ConditionCellSkeleton, DotAvailableCell, DotAvailableCellSkeleton, DualCurrencyPrice, DualCurrencyPriceSkeleton, IdentifierCell, IdentifierCellSkeleton, PictureCell, PictureCellSkeleton, RentalCell, RentalCellSkeleton, StatusCell, StatusCellSkeleton } from "../products-cells"
import { useTranslations } from "next-intl"
import { ProductWithRelationsWide } from "../../model/types"

interface ProductsWideCardProps {
  product: ProductWithRelationsWide
  isAdmin?: boolean
  className?: string
  openProductModal: (products: ProductWithRelationsWide) => void
  onDeleteProduct: (products: ProductWithRelationsWide) => void
}

export const ProductsWideCard = memo(({ product, isAdmin, className, onDeleteProduct, openProductModal }: ProductsWideCardProps) => {
  const { title } = product.translations[0];
  const { USD, UAH } = getProductPrimaryPrice(product.prices)
  const t = useTranslations('products.products-wide');

  return (
    <button
      type="button"
      onClick={() => openProductModal(product)}
      className={cn(
        "border rounded-md bg-card hover:shadow-md transition-all cursor-pointer w-full border-chart-1",
        "px-3 lg:px-6 py-2 lg:py-3 gap-1 ms:gap-2",
        className
      )}
    >
      <DotAvailableCell status={product.status} className="hidden lg:flex" />
      <PictureCell priority={true} url={product.photo} alt={title} className="col-span-2 lg:col-auto" />
      <IdentifierCell title={title} serialNumber={product.serialNumber} className="col-span-2 lg:col-auto" />
      <StatusCell status={product.status} label={t("status")} className="col-end-auto" />
      <RentalCell startDate={product.rental?.startDate} endDate={product.rental?.endDate} label={t("rental")} />
      <ConditionCell condition={product.isNew} label={t("condition")} />
      <DualCurrencyPrice sumUSD={USD} sumUAH={UAH} label={t("price")} />
      {isAdmin && <ActionsProductCell onDeleteProduct={() => { onDeleteProduct(product) }} isOwner={true} label={t("actions")} />}
    </button>
  )
})

ProductsWideCard.displayName = "ProductsWideCard"

export const ProductsWideCardSkeleton = memo(({ isAdmin, className }: { isAdmin?: boolean, className?: string }) => {
  return (
    <div
      className={cn(
        "px-4 py-2 lg:px-6 lg:py-3 gap-2 border rounded-md bg-card hover:shadow-md transition-all border-chart-1 w-full",
        className)
      }
    >
      <DotAvailableCellSkeleton className="hidden lg:flex" />
      <PictureCellSkeleton className="col-span-2 lg:col-span-1" />
      <IdentifierCellSkeleton className="col-span-2 lg:col-span-1" />
      <StatusCellSkeleton />
      <RentalCellSkeleton />
      <ConditionCellSkeleton />
      <DualCurrencyPriceSkeleton />
      {isAdmin && <ActionsProductCellSkeleton />}
    </div>
  )
})

ProductsWideCardSkeleton.displayName = "ProductsWideCardSkeleton"