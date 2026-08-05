"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { Input, InputSkeleton, Skeleton } from "@/shared/ui"
import { VALIDATION_LIMITS } from "@/shared/constants/validation"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { cn } from "@/shared/lib/utils"

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

export const OrderFieldSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-3.5", className)}>
      <Skeleton className="w-1/3 h-4.5" />
      <InputSkeleton />
    </div>
  )
}

OrderFieldSkeleton.displayName = "OrderFieldSkeleton"
