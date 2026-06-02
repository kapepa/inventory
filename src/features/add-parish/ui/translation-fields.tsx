"use client"

import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Textarea,
  AppLocale,
  TranslateWrapperInput,
  oppositeLocale,
} from "@/shared"
import { memo } from "react"
import { TranslatableFieldName } from "../model"

interface TranslationFieldsProps {
  locale: AppLocale
  isPending?: boolean
  handleTranslateAction: (fieldName: TranslatableFieldName, locale: AppLocale) => void
}

export const TranslationFields = memo(({ locale, isPending, handleTranslateAction }: TranslationFieldsProps) => {
  const t = useTranslations("parishe")
  const { control } = useFormContext()
  const otherLocaleUpper = oppositeLocale[locale].toUpperCase()

  return (
    <div className="space-y-7 mt-8">
      <FormField
        control={control}
        name={`translations.${locale}.title`}
        render={({ field, fieldState }) => (
          <FormItem className="relative">
            <FormLabel className="mb-3">
              {t("form-created.fields.title")} ({locale.toUpperCase()})
            </FormLabel>
            <FormControl className="mb-1">
              <TranslateWrapperInput
                onClick={() => handleTranslateAction("title", locale)}
                floatTitle={`${t("form-created.hints.translate.title")} ${otherLocaleUpper}`}
                disabled={isPending}
              >
                <Input
                  className="pr-10"
                  placeholder={t("form-created.placeholders.title")}
                  maxLength={100}
                  {...field}
                  disabled={isPending}
                />
              </TranslateWrapperInput>
            </FormControl>
            <FormMessage className="absolute top-full left-0 ring-0" >
              {fieldState.error?.message && t(`form-created.errors.${fieldState.error.message}`)}
            </FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`translations.${locale}.description`}
        render={({ field, fieldState }) => (
          <FormItem className="relative mb-2">
            <FormLabel className="mb-3">
              {t("form-created.fields.description")} ({locale.toUpperCase()})
            </FormLabel>
            <FormControl className="mb-1">
              <TranslateWrapperInput
                onClick={() => handleTranslateAction("description", locale)}
                floatTitle={`${t("form-created.hints.translate.description")} ${otherLocaleUpper}`}
                disabled={isPending}
              >
                <Textarea
                  placeholder={t("form-created.placeholders.description")}
                  className="resize-none min-h-25 max-h-60 overflow-y-autopr-10 break-all pr-10"
                  maxLength={400}
                  {...field}
                  disabled={isPending}
                />
              </TranslateWrapperInput>
            </FormControl>
            <FormMessage className="absolute top-full left-0 ring-0" >
              {fieldState.error?.message && t(`form-created.errors.${fieldState.error.message}`)}
            </FormMessage>
          </FormItem>
        )}
      />
    </div>
  )
});
