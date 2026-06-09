"use client"

import { memo, useRef, useState, useCallback } from "react"
import { useController, Control } from "react-hook-form"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "./button"
import { Label } from "./label"
import { cn } from "../lib/utils"

interface ImageUploadFieldProps {
  name: string
  control: Control<any>
  label?: string
  disabled?: boolean
  maxSizeMB?: number
  acceptedFormats?: string[]
  className?: string
}

export const ImageUploadField = memo(({
  name,
  control,
  label = "Image",
  disabled = false,
  maxSizeMB = 5,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  className
}: ImageUploadFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    field: { value, onChange },
    fieldState: { error: fieldError }
  } = useController({
    name,
    control,
  })

  // Generate preview when value changes (for existing images from DB)
  useState(() => {
    if (value && typeof value === 'string' && !preview) {
      setPreview(value)
    }
  })

  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    if (!acceptedFormats.includes(file.type)) {
      return `Only ${acceptedFormats.map(f => f.split('/')[1]).join(', ')} formats are allowed`
    }

    // Check file size
    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > maxSizeMB) {
      return `File size must be less than ${maxSizeMB}MB`
    }

    return null
  }, [acceptedFormats, maxSizeMB])

  const handleFileChange = useCallback((file: File | null) => {
    if (!file) {
      setPreview(null)
      setError(null)
      onChange(null)
      return
    }

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      setPreview(null)
      onChange(null)
      return
    }

    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Store file object in form state
    onChange(file)
  }, [onChange, validateFile])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleFileChange(file)
  }, [handleFileChange])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      setIsDragging(true)
    }
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (disabled) return

    const file = e.dataTransfer.files?.[0] || null
    handleFileChange(file)
  }, [disabled, handleFileChange])

  const handleRemove = useCallback(() => {
    setPreview(null)
    setError(null)
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onChange])

  const handleClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }, [disabled])

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label className="text-sm font-medium">{label}</Label>}

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
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain bg-gray-50 dark:bg-gray-900"
            />
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
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-800 p-4">
              {isDragging ? (
                <ImageIcon className="h-8 w-8 text-primary" />
              ) : (
                <Upload className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isDragging ? "Drop image here" : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')} (max {maxSizeMB}MB)
            </p>
          </div>
        )}
      </div>

      {/* Error messages */}
      {(error || fieldError?.message) && (
        <p className="text-sm text-red-500 dark:text-red-400">
          {error || fieldError?.message}
        </p>
      )}
    </div>
  )
})

ImageUploadField.displayName = "ImageUploadField"
