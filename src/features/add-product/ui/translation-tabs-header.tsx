"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { TabsList, TabsTrigger, cn } from "@/shared"
import { ProductCreateFormValues } from "../model"

export const TranslationTabsHeader = memo(() => {
  const t = useTranslations("add-product")
  const { getValues, formState } = useFormContext<ProductCreateFormValues>()

  const { errors, submitCount } = formState

  const hasRuErrors = !!(errors.translations?.ru?.title || errors.translations?.ru?.specification)
  const hasEnErrors = !!(errors.translations?.en?.title || errors.translations?.en?.specification)

  const ruTitle = getValues("translations.ru.title")
  const ruSpecification = getValues("translations.ru.specification")
  const enTitle = getValues("translations.en.title")
  const enSpecification = getValues("translations.en.specification")

  const hasRuEmpty = !ruTitle?.trim() || !ruSpecification?.trim()
  const hasEnEmpty = !enTitle?.trim() || !enSpecification?.trim()

  const showRu = hasRuErrors || (submitCount > 0 && hasRuEmpty)
  const showEn = hasEnErrors || (submitCount > 0 && hasEnEmpty)

  return (
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger
        className={cn("cursor-pointer", showRu && "border-destructive text-destructive")}
        value="ru"
      >
        {t("create-form.russian")}
      </TabsTrigger>
      <TabsTrigger
        className={cn("cursor-pointer", showEn && "border-destructive text-destructive")}
        value="en"
      >
        {t("create-form.english")}
      </TabsTrigger>
    </TabsList>
  )
})

TranslationTabsHeader.displayName = "TranslationTabsHeader"
