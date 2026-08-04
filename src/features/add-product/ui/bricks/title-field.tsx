"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { Input, InputSkeleton, Skeleton, TranslateWrapperInput } from "@/shared/ui"
import { VALIDATION_LIMITS } from "@/shared/constants"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { AppLocale, oppositeLocale } from "@/shared/lib/i18n/config"
import { cn } from "@/shared/lib"

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
                placeholder={t("placeholders.title")}
                maxLength={VALIDATION_LIMITS.TITLE_MAX_PRODUCT + 1}
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

export const TitleFieldSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-3.5", className)}>
      <Skeleton className="w-1/3 h-4.5" />
      <InputSkeleton />
    </div>
  )
}

TitleFieldSkeleton.displayName = "TitleFieldSkeleton"

