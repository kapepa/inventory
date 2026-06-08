"use client"

import { useState } from 'react'

import { toast } from 'sonner'
import { ProductCreateFormData } from '../schemas'

export const useProductCreate = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createProduct = async (formData: ProductCreateFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // const dto = transformFormToDTO(formData)

      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(dto),
      // })

      // if (!response.ok) {
      //   const errorData = await response.json()
      //   throw new Error(errorData.message || 'Failed to create product')
      // }

      // const newProduct = await response.json()

      toast.success('Product created successfully')

      // return newProduct
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createProduct,
    isLoading,
    error,
  }
}