"use client"

import { AppLocale } from "@/shared"
import { memo, useCallback } from "react"
import { TranslatableFieldName } from "../model"
import { TitleField } from "./title-field"

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
