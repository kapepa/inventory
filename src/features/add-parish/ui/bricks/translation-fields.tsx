"use client"

import { memo, useCallback } from "react"
import { TitleField } from "./title-field"
import { DescriptionField } from "./description-field"
import { AppLocale } from "@/shared/lib/i18n/config"
import { TranslatableFieldName } from "../../model/schemas-client"

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
    <div className="space-y-7 mt-2 md:mt-4">
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