import { useTranslations } from "next-intl"
import { cn, DotsDivider } from "@/shared"
import { ProductStatusView } from "./product-status-view"
import { ProductBadge } from "./product-badge"
import { Product, ProductStatus } from "@prisma/client"
import { memo } from "react"

interface ProductInfoListProps {
  className?: string
  order: Product["order"],
  serialNumber: Product["serialNumber"],
  status: ProductStatus,
  isNew: Product["isNew"]
}

export const ProductInfoList = memo(
  ({ serialNumber, order, status, isNew, className }: ProductInfoListProps) => {
    const t = useTranslations('groups.groups-relations.product-details-modal')

    return (
      <div className={cn("", className)}>
        <div className="flex justify-between text-sm">
          <span className="text-chart-2">{t("serial-number")}</span>
          <DotsDivider className="border-chart-2" />
          <span className="font-semibold px-3 ">{serialNumber}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-chart-2 ">{t("order")}</span>
          <DotsDivider className="border-chart-2" />
          <span className="font-semibold px-3">{order}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-chart-2">{t("status")}</span>
          <DotsDivider className="border-chart-2" />
          <ProductStatusView status={status} />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-chart-2">{t("condition")}</span>
          <DotsDivider className="border-chart-2" />
          <ProductBadge type={isNew} />
        </div>
      </div>
    )
  }
)

ProductInfoList.displayName = "ProductInfoList"