import { ProductStatusView } from "./product-status-view"
import { ProductBadge } from "./product-badge"
import { ProductStatus } from "@prisma/client"
import { DotsDivider } from "@/shared/ui"
import { cn } from "@/shared/lib/utils"
import { useTranslations } from "next-intl"

interface ProductInfoListProps {
  className?: string
  order: number | null,
  serialNumber: string | null,
  status: ProductStatus,
  isNew: boolean
  category?: string | null
  parish?: string | null
}

export const ProductInfoList = ({ serialNumber, order, status, isNew, className, category, parish }: ProductInfoListProps) => {
  const t = useTranslations('products.product-details')

  return (
    <div className={cn("", className)}>
      <div className="flex justify-between text-sm flex-col sm:flex-row">
        <span className="text-chart-2">{t("serial-number")}</span>
        <DotsDivider className="border-chart-2 hidden sm:block" />
        <span className="font-semibold px-3 break-all">{serialNumber}</span>
      </div>
      <div className="flex justify-between text-sm flex-col sm:flex-row">
        <span className="text-chart-2 ">{t("order")}</span>
        <DotsDivider className="border-chart-2 hidden sm:block" />
        <span className="font-semibold px-3 break-all">{order}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-chart-2">{t("status-label")}</span>
        <DotsDivider className="border-chart-2" />
        <ProductStatusView status={status} />
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-chart-2">{t("condition-label")}</span>
        <DotsDivider className="border-chart-2" />
        <ProductBadge type={isNew} />
      </div>
      {category && <div className="flex justify-between text-sm">
        <span className="text-chart-2">{t("category")}</span>
        <DotsDivider className="border-chart-2" />
        <span className="font-semibold px-3 ">{category}</span>
      </div>}
      {parish && <div className="flex justify-between text-sm">
        <span className="text-chart-2">{t("parish")}</span>
        <DotsDivider className="border-chart-2" />
        <span className="font-semibold px-3 ">{parish}</span>
      </div>}
    </div>
  )
}


ProductInfoList.displayName = "ProductInfoList"