"use client"

import { memo } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "./button"
import { cn } from "../lib/utils"
import { useImageUpload } from "../lib"
import { useTranslations } from "next-intl"

interface ImageUploadFieldProps {
  disabled?: boolean
  maxSizeMB?: number
  acceptedFormats?: string[]
  className?: string
  onChange?: (file: File | null) => void
}

export const ImageUploadField = memo(({
  disabled = false,
  maxSizeMB = 5,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  className,
  onChange
}: ImageUploadFieldProps) => {
  const t = useTranslations("image-upload-field")
  const {
    preview,
    isDragging,
    error,
    fileInputRef,
    handleInputChange,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleRemove,
    handleClick
  } = useImageUpload({ maxSizeMB, acceptedFormats, disabled, onChange })

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-colors",
          isDragging && !disabled && "border-primary bg-primary/5",
          !isDragging && "border-gray-300 dark:border-gray-700",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer hover:border-primary/50"
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />

        {preview ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img src={preview} alt="Preview" className="w-full h-full object-contain bg-gray-50 dark:bg-gray-900" />
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove()
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 px-3 sm:py-12 sm:px-6 text-center">
            <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-800 p-4">
              {isDragging ? <ImageIcon className="h-8 w-8 text-primary" /> : <Upload className="h-8 w-8 text-gray-400" />}
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isDragging ? t("drop-image-here") : t("upload-drag-drop")}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')} (max {maxSizeMB}MB)
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
    </div>
  )
})

ImageUploadField.displayName = "ImageUploadField"