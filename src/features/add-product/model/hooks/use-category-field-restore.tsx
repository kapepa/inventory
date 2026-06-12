"use client"

import { CategoryWithTranslations } from "@/entities/category/model/types"
import { STORAGE_KEYS } from "@/shared"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"

const ADD_PRODUCT_FORM_DATA = STORAGE_KEYS.ADD_PRODUCT_FORM_DATA

export const useRestoreFieldFromStorage = (
  items: CategoryWithTranslations[],
) => {
  const fieldName = "categoryId"
  const { setValue, getValues } = useFormContext()

  useEffect(() => {
    if (items.length === 0) return
    if (getValues(fieldName)) return

    try {
      const savedData = sessionStorage.getItem(ADD_PRODUCT_FORM_DATA)
      if (!savedData) return

      const { categoryId: value } = JSON.parse(savedData)
      if (value && items.some(item => item.id === value)) {
        setValue(fieldName, value, {
          shouldValidate: false,
          shouldDirty: false,
        })
      }
    } catch (error) {
      console.error(`Failed to restore ${fieldName}:`, error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])
}