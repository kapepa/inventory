"use client"

import { useMemo, useState, useTransition } from "react"
import { FieldPath, UseFormReturn } from "react-hook-form"
import { AppLocale, oppositeLocale, useThrottle, useTranslate } from "@/shared"
import { ParishFormValues, TranslatableFieldName } from "../schemas-client"


export const useAddParishTranslation = (form: UseFormReturn<ParishFormValues>) => {
  const { translate, isLoading: isTranslatingApi } = useTranslate()
  const [isTranslatingTransition, startTranslateTransition] = useTransition()
  const [translatingField, setTranslatingField] = useState<{ name: TranslatableFieldName, locale: AppLocale } | null>(null)

  const isTranslating = isTranslatingApi || isTranslatingTransition

  const handleTranslateAction = useThrottle(
    (fieldName: TranslatableFieldName, targetLocale: AppLocale) => {
      const otherLocale = oppositeLocale[targetLocale]
      const sourceValue = form.getValues(`translations.${otherLocale}.${fieldName}`)

      if (!sourceValue) return

      startTranslateTransition(async () => {
        setTranslatingField({ name: fieldName, locale: targetLocale })
        try {
          const translated = await translate(sourceValue, targetLocale)
          form.setValue(`translations.${targetLocale}.${fieldName}` as FieldPath<ParishFormValues>, translated, {
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
