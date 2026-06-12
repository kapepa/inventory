"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  AppLocale,
  TranslateWrapperInput,
  oppositeLocale,
} from "@/shared"

interface TitleFieldProps {
  locale: AppLocale
  isPending?: boolean
  autoFocus?: boolean
  isTranslating: boolean
  onTranslate: () => void
}

export const TitleField = memo(({
  locale,
  isPending,
  autoFocus,
  isTranslating,
  onTranslate
}: TitleFieldProps) => {
  const t = useTranslations("add-product.create-form")
  const { control } = useFormContext()
  const otherLocaleUpper = oppositeLocale[locale].toUpperCase()

  return (
    <FormField
      control={control}
      name={`translations.${locale}.title`}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="mb-3">
            {t('title')} ({locale.toUpperCase()})
          </FormLabel>
          <FormControl className="mb-1">
            <TranslateWrapperInput
              onClick={onTranslate}
              floatTitle={`${t("hints.translate.title")} ${otherLocaleUpper}`}
              disabled={isPending}
              isLoading={isTranslating}
            >
              <Input
                className="pr-10"
                placeholder={t("title-placeholder")}
                maxLength={100}
                {...field}
                disabled={isPending}
                autoFocus={autoFocus}
                aria-invalid={!!fieldState.error}
              />
            </TranslateWrapperInput>
          </FormControl>
          <div className="h-1 mt-0">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
})

TitleField.displayName = "TitleField"
