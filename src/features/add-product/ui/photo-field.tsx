"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, ImageUploadField } from "@/shared"

interface PhotoFieldProps {
  isPending?: boolean
}

export const PhotoField = memo(({ isPending }: PhotoFieldProps) => {
  const t = useTranslations("add-product.create-form")
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="photo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('photo-url')}</FormLabel>
          <FormControl>
            <ImageUploadField
              disabled={isPending}
              maxSizeMB={5}
              acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
              onChange={field.onChange}
              className="w-full aspect-video"
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

PhotoField.displayName = "PhotoField"
