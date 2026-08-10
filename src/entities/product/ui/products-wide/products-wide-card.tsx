"use client"

import { memo } from "react"
import { cn } from "@/shared/lib/utils"
import { useTranslations } from "next-intl"
import { ProductWithRelationsWide } from "../../model/types"
import { getProductPrimaryPrice } from "@/shared/lib/get-product-price"
import { DotAvailableCell } from "../products-cells/dot-available-cell"
import { PictureCell } from "../products-cells/picture-cell"
import { IdentifierCell } from "../products-cells/identifier-cell"
import { StatusCell } from "../products-cells/status-cell"
import { RentalCell } from "../products-cells/rental-cell"
import { ConditionCell } from "../products-cells/condition-cell"
import { DualCurrencyPrice } from "../products-cells/dual-currency-price"
import { ActionsProductCell } from "../products-cells/actions-product-cell"
import { AppLocale } from "@/shared/lib/i18n/config"

interface ProductsWideCardProps {
  locale: AppLocale,
  product: ProductWithRelationsWide
  isAdmin?: boolean
  className?: string
  openProductModal: (products: ProductWithRelationsWide) => void
  onDeleteProduct: (products: ProductWithRelationsWide) => void
}

export const ProductsWideCard = memo(({ locale, product, isAdmin, className, onDeleteProduct, openProductModal }: ProductsWideCardProps) => {
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
      <RentalCell locale={locale} startDate={product.rental?.startDate} endDate={product.rental?.endDate} label={t("rental")} />
      <ConditionCell condition={product.isNew} label={t("condition")} />
      <DualCurrencyPrice sumUSD={USD} sumUAH={UAH} label={t("price")} />
      {isAdmin && <ActionsProductCell onDeleteProduct={() => { onDeleteProduct(product) }} isOwner={true} label={t("actions")} />}
    </button>
  )
})

ProductsWideCard.displayName = "ProductsWideCard"