"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { Skeleton, Textarea, TranslateWrapperInput } from "@/shared/ui"
import { VALIDATION_LIMITS } from "@/shared/constants/validation"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { AppLocale, oppositeLocale } from "@/shared/lib/i18n/config"
import { cn } from "@/shared/lib/utils"
import { TextareaSkeleton } from "@/shared/ui/textarea"

interface DescriptionFieldProps {
  locale: AppLocale
  isPending?: boolean
  isTranslating: boolean
  onTranslate: () => void
}

export const DescriptionField = memo(({
  locale,
  isPending,
  isTranslating,
  onTranslate
}: DescriptionFieldProps) => {
  const t = useTranslations("add-parish.form")
  const { control } = useFormContext()
  const otherLocaleUpper = oppositeLocale[locale].toUpperCase()

  return (
    <FormField
      control={control}
      name={`translations.${locale}.description`}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="mb-3">
            {t("fields.description")} ({locale.toUpperCase()})
          </FormLabel>
          <FormControl className="mb-1">
            <TranslateWrapperInput
              onClick={onTranslate}
              floatTitle={`${t("hints.translate.description")} ${otherLocaleUpper}`}
              disabled={isPending}
              isLoading={isTranslating}
            >
              <Textarea
                placeholder={t("placeholders.description")}
                className="resize-none min-h-25 max-h-60 overflow-y-autopr-10 break-all pr-10"
                maxLength={VALIDATION_LIMITS.DESC_MAX_PARISH + 1}
                {...field}
                disabled={isPending}
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

DescriptionField.displayName = "DescriptionField"

export const DescriptionFieldSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-3.5", className)}>
      <Skeleton className="w-1/3 h-4.5" />
      <TextareaSkeleton className="min-h-24" />
    </div>
  )
}

DescriptionFieldSkeleton.displayName = "DescriptionFieldSkeleton"
