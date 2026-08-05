"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { Input, InputSkeleton, Skeleton, TranslateWrapperInput } from "@/shared/ui"
import { VALIDATION_LIMITS } from "@/shared/constants/validation"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { AppLocale, oppositeLocale } from "@/shared/lib/i18n/config"
import { cn } from "@/shared/lib/utils"

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
  const t = useTranslations("add-category.form")
  const { control } = useFormContext()
  const otherLocaleUpper = oppositeLocale[locale].toUpperCase()

  return (
    <FormField
      control={control}
      name={`translations.${locale}.title`}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="mb-3">
            {t("fields.title")} ({locale.toUpperCase()})
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
                maxLength={VALIDATION_LIMITS.TITLE_MAX_CATEGORY + 1}
                {...field}
                disabled={isPending}
                autoFocus={autoFocus}
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
