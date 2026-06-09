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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared"

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
