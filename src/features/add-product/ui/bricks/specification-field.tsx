"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { Skeleton, Textarea, TranslateWrapperInput } from "@/shared/ui"
import { VALIDATION_LIMITS } from "@/shared/constants"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { AppLocale, oppositeLocale } from "@/shared/lib/i18n/config"
import { cn } from "@/shared/lib"
import { TextareaSkeleton } from "@/shared/ui/textarea"

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
                placeholder={t("placeholders.specification")}
                className="resize-none min-h-25 max-h-60 overflow-y-auto pr-10 break-all"
                maxLength={VALIDATION_LIMITS.SPECIFICATION_MAX_PRODUCT + 1}
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

export const SpecificationFieldSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-3.5", className)}>
      <Skeleton className="w-1/3 h-4.5" />
      <TextareaSkeleton className="min-h-24" />
    </div>
  )
}

SpecificationFieldSkeleton.displayName = "SpecificationFieldSkeleton"