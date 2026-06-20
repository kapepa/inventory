import { useTranslations } from "next-intl"
import { cn, DotsDivider } from "@/shared"
import { ProductStatusView } from "./product-status-view"
import { ProductBadge } from "./product-badge"
import { ProductStatus } from "@prisma/client"
import { memo } from "react"

interface ProductInfoListProps {
  className?: string
  order: number | null,
  serialNumber: string | null,
  status: ProductStatus,
  isNew: boolean
  category?: string | null
}

export const ProductInfoList = memo(
  ({ serialNumber, order, status, isNew, className, category }: ProductInfoListProps) => {
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
        <div className="flex justify-between text-sm">
          <span className="text-chart-2">{t("condition")}</span>
          <DotsDivider className="border-chart-2" />
          <ProductBadge type={isNew} />
        </div>
        {category && <div className="flex justify-between text-sm">
          <span className="text-chart-2">Cat</span>
          <DotsDivider className="border-chart-2" />
          <span className="font-semibold px-3">{category}</span>
        </div>}
      </div>
    )
  }
)

ProductInfoList.displayName = "ProductInfoList"