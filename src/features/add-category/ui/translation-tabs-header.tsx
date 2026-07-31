"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { TabsList, TabsTrigger } from "@/shared/ui"
import { cn } from "@/shared/lib"
import { CategoryFormValues } from "../model/schemas-client"

export const TranslationTabsHeader = memo(() => {
  const t = useTranslations("add-parish.form")
  const { getValues, formState } = useFormContext<CategoryFormValues>()

  const { errors, submitCount } = formState

  const hasRuErrors = !!(errors.translations?.ru?.title)
  const hasEnErrors = !!(errors.translations?.en?.title)

  const ruTitle = getValues("translations.ru.title")
  const enTitle = getValues("translations.en.title")

  const hasRuEmpty = !ruTitle?.trim()
  const hasEnEmpty = !enTitle?.trim()

  const showRu = hasRuErrors || (submitCount > 0 && hasRuEmpty)
  const showEn = hasEnErrors || (submitCount > 0 && hasEnEmpty)

  return (
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger
        className={cn("cursor-pointer", showRu && "border-destructive text-destructive")}
        value="ru"
      >
        {t("russian")}
      </TabsTrigger>
      <TabsTrigger
        className={cn("cursor-pointer", showEn && "border-destructive text-destructive")}
        value="en"
      >
        {t("english")}
      </TabsTrigger>
    </TabsList>
  )
})

TranslationTabsHeader.displayName = "TranslationTabsHeader"
