"use client"

import { cn } from "@/shared/lib/utils"
import { useTranslations } from "next-intl"

interface ProductAuthorProps {
  name: string
  classNamne?: string
}

export const ProductAuthor = ({ name, classNamne }: ProductAuthorProps) => {
  const t = useTranslations('products.product-details')

  return (
    <div className={cn("flex flex-col items-center text-chart-2", classNamne)}>
      <span className="">{t("author")}</span>
      <span className="break-all">{name}</span>
    </div>
  )
}

ProductAuthor.displayName = "ProductAuthor"