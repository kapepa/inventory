"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { ImageUploadField } from "@/shared"

interface PhotoFieldProps {
  isPending?: boolean
}

export const PhotoField = memo(({ isPending }: PhotoFieldProps) => {
  const t = useTranslations("add-product.create-form")
  const { control } = useFormContext()

  return (
    <>
      <ImageUploadField
        name="photo"
        control={control}
        label={t('photo-url')}
        disabled={isPending}
        maxSizeMB={5}
        acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
      />
    </>
  )
})

PhotoField.displayName = "PhotoField"
