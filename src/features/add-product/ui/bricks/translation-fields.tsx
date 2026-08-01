"use client"

import { memo, useCallback } from "react"
import { TitleField } from "./title-field"
import { SpecificationField } from "./specification-field"
import { AppLocale } from "@/shared/lib/i18n/config"
import { TranslatableProductFieldName } from "../../model/schemas-client"

interface TranslationFieldsProps {
  locale: AppLocale
  isPending?: boolean
  autoFocus?: boolean
  translatingFieldName?: TranslatableProductFieldName | null
  handleTranslateAction: (fieldName: TranslatableProductFieldName, locale: AppLocale) => void
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

  const handleTranslateSpecification = useCallback(() => {
    handleTranslateAction("specification", locale)
  }, [handleTranslateAction, locale])

  return (
    <div className="space-y-7 mt-8">
      <TitleField
        locale={locale}
        isPending={isPending}
        autoFocus={autoFocus}
        isTranslating={translatingFieldName === "title"}
        onTranslate={handleTranslateTitle}
      />
      <SpecificationField
        locale={locale}
        isPending={isPending}
        isTranslating={translatingFieldName === "specification"}
        onTranslate={handleTranslateSpecification}
      />
    </div>
  )
})

TranslationFields.displayName = "TranslationFields"
