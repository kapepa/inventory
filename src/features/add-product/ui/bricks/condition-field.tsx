"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { InputSkeleton, Skeleton } from "@/shared/ui"
import { cn } from "@/shared/lib"

interface ConditionFieldProps {
  isPending?: boolean
}

export const ConditionField = memo(({ isPending }: ConditionFieldProps) => {
  const t = useTranslations("add-product.create-form")
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="isNew"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('condition')}</FormLabel>
          <FormControl>
            <Select
              value={field.value ? 'new' : 'used'}
              onValueChange={(value) => field.onChange(value === 'new')}
              disabled={isPending}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="new">{t('condition-new')}</SelectItem>
                <SelectItem value="used">{t('condition-used')}</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

ConditionField.displayName = "ConditionField"

export const ConditionFieldSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-3.5", className)}>
      <Skeleton className="w-1/3 h-4.5" />
      <InputSkeleton />
    </div>
  )
}

ConditionFieldSkeleton.displayName = "ConditionFieldSkeleton"
