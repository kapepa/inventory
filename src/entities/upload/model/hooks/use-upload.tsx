"use client"

import { useState, useCallback } from 'react'
import { requestUploadFile } from '../../api/upload-api'
import { ResponsiveImageSizes } from '../types/types'

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = useCallback(async (file: File): Promise<ResponsiveImageSizes> => {
    setIsUploading(true)
    setError(null)
    try {
      const result = await requestUploadFile({ file })
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed'
      setError(message)
      throw err
    } finally {
      setIsUploading(false)
    }
  }, [])

  return {
    upload,
    isUploading,
    error,
  }
}