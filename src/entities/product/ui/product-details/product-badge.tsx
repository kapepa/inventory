import { cn, PRODUCT_CONDITION_DISPLAY } from "@/shared/lib"
import { useTranslations } from "next-intl"

interface ProductBadgeProps {
  className?: string,
  type: boolean,
}

export const ProductBadge = ({ type, className }: ProductBadgeProps) => {
  const t = useTranslations('groups.groups-relations.products.condition')
  const condition = PRODUCT_CONDITION_DISPLAY[type ? "NEW" : "OLD"]

  return (
    <div className={cn("px-3 text-white text-sm font-semibold rounded-full", condition.bgClass, className)}>
      <span>{t(condition.labelKey)}</span>
    </div>
  )
}

ProductBadge.displayName = "ProductBadge"