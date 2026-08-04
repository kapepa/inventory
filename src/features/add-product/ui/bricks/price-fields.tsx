"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { Input, InputSkeleton, Skeleton } from "@/shared/ui"
import { VALIDATION_LIMITS } from "@/shared/constants"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { cn } from "@/shared/lib"

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

export const PriceFieldsSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      <div className="flex flex-col gap-y-3.5">
        <Skeleton className="w-1/3 h-4.5" />
        <InputSkeleton />
      </div>
      <div className="flex flex-col gap-y-3.5">
        <Skeleton className="w-1/3 h-4.5" />
        <InputSkeleton />
      </div>
    </div>
  )
}

PriceFieldsSkeleton.displayName = "PriceFieldsSkeleton"
