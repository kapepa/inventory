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
} from "@/shared"

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
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{t('serial-number')}</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder={t('serial-number-placeholder')}
              {...field}
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value === '' ? undefined : e.target.valueAsNumber)}
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
