import { cn, ResponsiveImage } from "@/shared"
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
        className={cn("w-full h-52 sm:h-64 object-cover", className)}
        priority
        sizes="(max-width: 480px) 100vw"
      />
    )
  }
)

ProductImage.displayName = "ProductImage"