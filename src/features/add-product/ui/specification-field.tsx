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
  Textarea,
  AppLocale,
  TranslateWrapperInput,
  oppositeLocale,
} from "@/shared"

interface SpecificationFieldProps {
  locale: AppLocale
  isPending?: boolean
  isTranslating: boolean
  onTranslate: () => void
}

export const SpecificationField = memo(({
  locale,
  isPending,
  isTranslating,
  onTranslate
}: SpecificationFieldProps) => {
  const t = useTranslations("add-product.create-form")
  const { control } = useFormContext()
  const otherLocaleUpper = oppositeLocale[locale].toUpperCase()

  return (
    <FormField
      control={control}
      name={`translations.${locale}.specification`}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="mb-3">
            {t("specification")} ({locale.toUpperCase()})
          </FormLabel>
          <FormControl className="mb-1">
            <TranslateWrapperInput
              onClick={onTranslate}
              floatTitle={`${t("hints.translate.specification")} ${otherLocaleUpper}`}
              disabled={isPending}
              isLoading={isTranslating}
            >
              <Textarea
                placeholder={t("specification-placeholder")}
                className="resize-none min-h-25 max-h-60 overflow-y-auto pr-10 break-all"
                maxLength={400}
                {...field}
                disabled={isPending}
                rows={3}
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

SpecificationField.displayName = "SpecificationField"
