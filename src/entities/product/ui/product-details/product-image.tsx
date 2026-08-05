import { cn } from "@/shared/lib/utils"
import { ResponsiveImage } from "@/shared/ui"
import { memo } from "react"

interface ProductImageProps {
  className?: string
  alt: string
  source: string
}

export const ProductImage = memo(
  ({ alt, source, className }: ProductImageProps) => {
    return (
      <ResponsiveImage
        source={source}
        alt={alt}
        aspectRatio="auto"
        className={cn("w-full h-36 sm:h-64", className)}
        objectFit="contain"
        priority
        sizes="(max-width: 480px) 100vw"
      />
    )
  }
)

ProductImage.displayName = "ProductImage"