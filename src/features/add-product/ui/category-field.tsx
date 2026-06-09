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
  AppLocale
} from "@/shared"
import { useCategories } from "@/entities"

interface CategoryFieldProps {
  isPending?: boolean
}

export const CategoryField = memo(({ isPending }: CategoryFieldProps) => {
  const t = useTranslations("add-product.create-form")
  const locale = useLocale() as AppLocale
  const { control } = useFormContext()
  const { categories, isLoading } = useCategories(locale)

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
              <SelectTrigger>
                <SelectValue placeholder={t('category-placeholder')} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.translations[0]?.title || 'Untitled'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

CategoryField.displayName = "CategoryField"
