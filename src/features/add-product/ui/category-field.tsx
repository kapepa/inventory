"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations, useLocale } from "next-intl"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  AppLocale,
  STORAGE_KEYS
} from "@/shared"
import { useCategories } from "@/entities"
import { useRestoreFieldFromStorage } from "../model"

interface CategoryFieldProps {
  isPending?: boolean
}

export const CategoryField = memo(({ isPending }: CategoryFieldProps) => {
  const t = useTranslations("add-product.create-form")
  const locale = useLocale() as AppLocale
  const { control } = useFormContext()
  const { categories, isLoading } = useCategories(locale)

  useRestoreFieldFromStorage(categories)

  return (
    <FormField
      control={control}
      name="categoryId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('category')}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={isPending || isLoading}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('category-placeholder')} />
              </SelectTrigger>
            </FormControl>
            <SelectContent position="popper" sideOffset={5}>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.translations[0]?.title || 'Untitled'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="h-1 mt-0">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
})

CategoryField.displayName = "CategoryField"
