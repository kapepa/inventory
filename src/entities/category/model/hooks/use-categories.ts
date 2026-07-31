"use client"

import { useEffect, useState } from 'react'
import { requestCategories } from '../../api'
import { CategoryWithTranslations } from '../types'
import { AppLocale } from '@/shared/lib/i18n/config'

export const useCategories = (locale: AppLocale) => {
  const [categories, setCategories] = useState<CategoryWithTranslations[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true)
        const data = await requestCategories({ locale })
        setCategories(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load categories'))
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [locale])

  return { categories, isLoading, error }
}
