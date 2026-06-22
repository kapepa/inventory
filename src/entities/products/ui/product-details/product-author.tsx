import { cn } from "@/shared"
import { useTranslations } from "next-intl"
import { memo } from "react"

interface ProductAuthorProps {
  name: string
  classNamne?: string
}

export const ProductAuthor = memo(({ name, classNamne }: ProductAuthorProps) => {
  const t = useTranslations('products.product-details')

  return (
    <div className={cn("flex flex-col items-center text-chart-2", classNamne)}>
      <span className="">{t("author")}</span>
      <span className="break-all">{name}</span>
    </div>
  )
})

ProductAuthor.displayName = "ProductAuthor"