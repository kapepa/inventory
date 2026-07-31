"use client"

import { memo, useCallback } from "react"
import { TitleField } from "./title-field"
import { AppLocale } from "@/shared/lib/i18n/config"
import { CategoryTranslatableFieldName } from "../model/schemas-client"

interface TranslationFieldsProps {
  locale: AppLocale
  isPending?: boolean
  autoFocus?: boolean
  translatingFieldName?: CategoryTranslatableFieldName | null
  handleTranslateAction: (fieldName: CategoryTranslatableFieldName, locale: AppLocale) => void
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

  return (
    <div className="space-y-7 mt-6 md:mt-8">
      <TitleField
        locale={locale}
        isPending={isPending}
        autoFocus={autoFocus}
        isTranslating={translatingFieldName === "title"}
        onTranslate={handleTranslateTitle}
      />
    </div>
  )
})

TranslationFields.displayName = "TranslationFields"
