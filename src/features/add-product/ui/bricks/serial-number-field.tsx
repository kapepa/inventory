"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { Input } from "@/shared/ui/input"
import { VALIDATION_LIMITS } from "@/shared/constants/validation"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"

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