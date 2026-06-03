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
import { TranslatableFieldName } from "../model"

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
  const t = useTranslations("parishe")
  const { control } = useFormContext()
  const otherLocaleUpper = oppositeLocale[locale].toUpperCase()

  return (
    <FormField
      control={control}
      name={`translations.${locale}.title`}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="mb-3">
            {t("form-created.fields.title")} ({locale.toUpperCase()})
          </FormLabel>
          <FormControl className="mb-1">
            <TranslateWrapperInput
              onClick={onTranslate}
              floatTitle={`${t("form-created.hints.translate.title")} ${otherLocaleUpper}`}
              disabled={isPending}
              isLoading={isTranslating}
            >
              <Input
                className="pr-10"
                placeholder={t("form-created.placeholders.title")}
                maxLength={100}
                {...field}
                disabled={isPending}
                autoFocus={autoFocus}
              />
            </TranslateWrapperInput>
          </FormControl>
          <div className="h-1 mt-0">
            <FormMessage>
              {fieldState.error?.message && t(`form-created.errors.${fieldState.error.message}`)}
            </FormMessage>
          </div>
        </FormItem>
      )}
    />
  )
})

TitleField.displayName = "TitleField"
