"use client"

import { useTranslations } from "next-intl"
import { useState, useCallback, useRef, useEffect } from "react"
import { useController, Control } from "react-hook-form"

interface UseImageUploadProps {
  name: string
  control: Control<any>
  maxSizeMB: number
  acceptedFormats: string[]
  disabled: boolean
}

export const useImageUpload = ({
  name,
  control,
  maxSizeMB,
  acceptedFormats,
  disabled
}: UseImageUploadProps) => {
  const t = useTranslations("image-upload-field")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    field: { value, onChange },
    fieldState: { error: fieldError }
  } = useController({ name, control })

  // Set initial preview (e.g., link from DB)
  useEffect(() => {
    if (value && typeof value === 'string' && !preview) {
      setPreview(value)
    }
  }, [value, preview])

  const validateFile = useCallback((file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      const formats = acceptedFormats.map(f => f.split('/')[1]).join(', ')
      return t('invalid-format', { formats })
    }
    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > maxSizeMB) {
      return t('file-too-large', { maxSizeMB })
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
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
    onChange(file)
  }, [onChange, validateFile])

  const handlers = {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileChange(e.target.files?.[0] || null)
    },
    handleDragEnter: (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) setIsDragging(true)
    },
    handleDragLeave: (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    },
    handleDragOver: (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    },
    handleDrop: (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      if (!disabled) handleFileChange(e.dataTransfer.files?.[0] || null)
    },
    handleRemove: () => {
      setPreview(null)
      setError(null)
      onChange(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    },
    handleClick: () => {
      if (!disabled) fileInputRef.current?.click()
    }
  }

  return {
    preview,
    isDragging,
    error: error || fieldError?.message,
    fileInputRef,
    ...handlers
  }
}