import { cn, STATUS_DISPLAY_CONFIG } from "@/shared/lib"
import { ProductStatus } from "@prisma/client"
import { useTranslations } from "next-intl";

interface ProductStatusViewProps {
  status: ProductStatus,
  className?: string,
}

export const ProductStatusView = ({ status, className }: ProductStatusViewProps) => {
  const t = useTranslations('groups.groups-relations.products.status')
  const statusView = STATUS_DISPLAY_CONFIG[status];

  return (
    <div className={
      cn("px-3 text-white text-sm font-semibold rounded-full", statusView.bgClass, className)}
    >
      <span>{t(statusView.labelKey)}</span>
    </div>
  )
}

ProductStatusView.displayName = "ProductStatusView"