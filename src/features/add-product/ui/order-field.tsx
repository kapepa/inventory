"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { Input } from "@/shared/ui"
import { VALIDATION_LIMITS } from "@/shared/constants"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"

interface OrderFieldProps {
  isPending?: boolean
}

export const OrderField = memo(({ isPending }: OrderFieldProps) => {
  const t = useTranslations("add-product.create-form")
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="order"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('order')}</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder={t('placeholders.order')}
              {...field}
              value={field.value ?? ''}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, '').slice(0, 9)
                field.onChange(raw === '' ? undefined : Number(raw))
              }}
              maxLength={VALIDATION_LIMITS.ORDER_MAX_PRODUCT + 1}
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

OrderField.displayName = "OrderField"
