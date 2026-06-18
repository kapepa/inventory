"use client"

import { memo } from "react"

interface ProductsWideBodyProps {
  className?: string
}

export const ProductsWideBody = memo(({ }: ProductsWideBodyProps) => {
  return (
    <div>
      ProductsWideBody
    </div>
  )
})

ProductsWideBody.displayName = "ProductsWideBody"