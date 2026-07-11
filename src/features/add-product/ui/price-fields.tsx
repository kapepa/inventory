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
  VALIDATION_LIMITS,
} from "@/shared"

interface PriceFieldsProps {
  isPending?: boolean
}

export const PriceFields = memo(({ isPending }: PriceFieldsProps) => {
  const t = useTranslations("add-product.create-form")
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="priceUAH"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('price-uah')}</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                placeholder={t("placeholders.price")}
                {...field}
                value={field.value ?? ''}
                onChange={(e) => {
                  const raw = e.target.value
                    .replace(/[^\d.]/g, '')
                    .replace(/(\..*)\./g, '$1')
                    .slice(0, 9)
                  field.onChange(raw === '' ? undefined : Number(raw))
                }}
                maxLength={VALIDATION_LIMITS.PRICE_MAX_VALUE}
                disabled={isPending}
              />
            </FormControl>
            <div className="h-1 mt-0">
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="priceUSD"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('price-usd')}</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...field}
                value={field.value ?? ''}
                onChange={(e) => {
                  const raw = e.target.value
                    .replace(/[^\d.]/g, '')
                    .replace(/(\..*)\./g, '$1')
                    .slice(0, 9)
                  field.onChange(raw === '' ? undefined : Number(raw))
                }}
                maxLength={VALIDATION_LIMITS.PRICE_MAX_VALUE}
                disabled={isPending}
              />
            </FormControl>
            <div className="h-1 mt-0">
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
})

PriceFields.displayName = "PriceFields"
