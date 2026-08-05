"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { Input, InputSkeleton, Skeleton } from "@/shared/ui"
import { VALIDATION_LIMITS } from "@/shared/constants/validation"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { cn } from "@/shared/lib/utils"

interface SerialNumberFieldProps {
  isPending?: boolean
}

export const SerialNumberField = memo(({ isPending }: SerialNumberFieldProps) => {
  const t = useTranslations("add-product.create-form")
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="serialNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('serial-number')}</FormLabel>
          <FormControl>
            <Input
              placeholder={t('placeholders.serial-number')}
              {...field}
              value={field.value ?? ''}
              maxLength={VALIDATION_LIMITS.SERIAL_NUM_MAX_PRODUCT + 1}
              disabled={isPending}
            />
          </FormControl>
          <div className="h-1 mt-0">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
})

SerialNumberField.displayName = "SerialNumberField"

export const SerialNumberFieldSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-3.5", className)}>
      <Skeleton className="w-1/3 h-4.5" />
      <InputSkeleton />
    </div>
  )
}

SerialNumberFieldSkeleton.displayName = "SerialNumberFieldSkeleton"