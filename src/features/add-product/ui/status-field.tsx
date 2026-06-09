"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { ProductStatus } from "@prisma/client"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared"

interface StatusFieldProps {
  isPending?: boolean
}

export const StatusField = memo(({ isPending }: StatusFieldProps) => {
  const t = useTranslations("add-product.create-form")
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="status"
      render={({ field }) => {
        const currentValue = field.value || ProductStatus.FREE

        return (
          <FormItem>
            <FormLabel>{t('status')}</FormLabel>
            <FormControl>
              <Select
                value={currentValue}
                onValueChange={(value) => {
                  if (value && value !== '') field.onChange(value)
                }}
                disabled={isPending}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('status-placeholder')} />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value={ProductStatus.FREE}>{t('status-free')}</SelectItem>
                  <SelectItem value={ProductStatus.BUSY}>{t('status-busy')}</SelectItem>
                  <SelectItem value={ProductStatus.REPAIR}>{t('status-repair')}</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )
      }}
    />
  )
})

StatusField.displayName = "StatusField"
