import { ProductWithRelationsWide, ProductWithRelationsShort, hasCategory } from "../../model";
import { ProductInfoList } from "./product-info-list";
import { ProductPricing } from "./product-pricing";
import { ProductHeader } from "./product-header";
import { ProductImage } from "./product-image";
import { getProductPrimaryPrice } from "@/shared";

interface ProductDetailsProps {
  product: ProductWithRelationsWide | ProductWithRelationsShort
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { title, specification } = product.translations[0];
  const { UAH, USD } = getProductPrimaryPrice(product.prices)
  const category = hasCategory(product) ? product.category.translations[0].title : null


  return (
    <div className="max-w-md mx-aut">
      <ProductImage
        alt={title}
        source={product.photo || ""}
      />
      <div className="py-3 sm:py-0 sm:p-6">
        <ProductHeader title={title} specification={specification} />
        <ProductPricing prices={{ UAH, USD }} className="mb-2 sm:mb-4" />
        <ProductInfoList
          isNew={product.isNew}
          order={product.order}
          serialNumber={product.serialNumber}
          status={product.status}
          category={category}
          className="space-y-2 mb-4"
        />
      </div>
    </div>
  )
}

ProductDetails.displayName = "ProductDetails";