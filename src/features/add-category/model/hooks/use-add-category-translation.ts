"use client"

import { useMemo, useState, useTransition } from "react"
import { FieldPath, UseFormReturn } from "react-hook-form"
import { CategoryFormValues, CategoryTranslatableFieldName } from "../schemas-client"
import { useThrottle } from "@/shared/lib/hooks/use-throttle"
import { AppLocale, oppositeLocale } from "@/shared/lib/i18n/config"
import { useTranslate } from "@/shared/lib/hooks/use-translate"

export const useAddCategoryTranslation = (form: UseFormReturn<CategoryFormValues>) => {
  const { translate, isLoading: isTranslatingApi } = useTranslate()
  const [isTranslatingTransition, startTranslateTransition] = useTransition()
  const [translatingField, setTranslatingField] = useState<{ name: CategoryTranslatableFieldName, locale: AppLocale } | null>(null)

  const isTranslating = isTranslatingApi || isTranslatingTransition

  const handleTranslateAction = useThrottle(
    (fieldName: CategoryTranslatableFieldName, targetLocale: AppLocale) => {
      const otherLocale = oppositeLocale[targetLocale]
      const sourceValue = form.getValues(`translations.${otherLocale}.${fieldName}`)

      if (!sourceValue) return

      startTranslateTransition(async () => {
        setTranslatingField({ name: fieldName, locale: targetLocale })
        try {
          const translated = await translate(sourceValue, targetLocale)
          form.setValue(`translations.${targetLocale}.${fieldName}` as FieldPath<CategoryFormValues>, translated, {
            shouldValidate: true,
            shouldDirty: true,
          })
        } catch (err) {
          console.error("Translation error:", err)
        } finally {
          setTranslatingField(null)
        }
      })
    },
    2500
  )

  return useMemo(
    () => ({
      isTranslating,
      translatingField,
      handleTranslateAction
    }),
    [isTranslating, translatingField, handleTranslateAction]
  )
}
