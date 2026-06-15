"use client"

import { AppLocale } from "@/shared"
import { memo, useCallback } from "react"
import { TranslatableFieldName } from "../model"
import { TitleField } from "./title-field"
import { DescriptionField } from "./description-field"

interface TranslationFieldsProps {
  locale: AppLocale
  isPending?: boolean
  autoFocus?: boolean
  translatingFieldName?: TranslatableFieldName | null
  handleTranslateAction: (fieldName: TranslatableFieldName, locale: AppLocale) => void
}

export const TranslationFields = memo(({
  locale,
  isPending,
  autoFocus,
  translatingFieldName,
  handleTranslateAction
}: TranslationFieldsProps) => {
  const handleTranslateTitle = useCallback(() => {
    handleTranslateAction("title", locale)
  }, [handleTranslateAction, locale])

  const handleTranslateDescription = useCallback(() => {
    handleTranslateAction("description", locale)
  }, [handleTranslateAction, locale])

  return (
    <div className="space-y-7 mt-6 md:mt-8">
      <TitleField
        locale={locale}
        isPending={isPending}
        autoFocus={autoFocus}
        isTranslating={translatingFieldName === "title"}
        onTranslate={handleTranslateTitle}
      />
      <DescriptionField
        locale={locale}
        isPending={isPending}
        isTranslating={translatingFieldName === "description"}
        onTranslate={handleTranslateDescription}
      />
    </div>
  )
})

TranslationFields.displayName = "TranslationFields"
