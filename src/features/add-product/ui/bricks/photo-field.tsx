"use client"

import { forwardRef, memo, useImperativeHandle, useRef } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { ImageUploadField } from "@/shared/ui/image-upload-field"
import { ImageUploadFieldRef } from "@/shared/types"
import { UPLOAD_LIMITS } from "@/shared/constants/upload-limits"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { PhotoFieldRef } from "../../model/types"

interface PhotoFieldProps {
  isPending?: boolean
}

export const PhotoField = memo(forwardRef<PhotoFieldRef, PhotoFieldProps>(({ isPending }: PhotoFieldProps, ref) => {
  const t = useTranslations("add-product.create-form")
  const { control } = useFormContext()
  const uploadRef = useRef<ImageUploadFieldRef>(null)

  useImperativeHandle(ref, () => ({
    clearImage: () => {
      uploadRef.current?.clear()
    }
  }), [])

  return (
    <FormField
      control={control}
      name="photo"
      render={({ field }) => (
        <FormItem className="pb-2">
          <FormLabel>{t('photo-url')}</FormLabel>
          <FormControl>
            <ImageUploadField
              ref={uploadRef}
              disabled={isPending}
              maxSizeMB={UPLOAD_LIMITS.IMAGE_MAX_SIZE_MB}
              onChange={field.onChange}
              className="w-full"
            />
          </FormControl>
          <div className="h-1 mt-0">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}))

PhotoField.displayName = "PhotoField"