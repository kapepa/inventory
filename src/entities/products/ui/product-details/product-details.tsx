import { ProductsWithRelations } from "../../model";
import { ProductInfoList } from "./product-info-list";
import { ProductPricing } from "./product-pricing";
import { ProductHeader } from "./product-header";
import { ProductImage } from "./product-image";

interface ProductDetailsProps {
  product: ProductsWithRelations
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { title, specification } = product.translations[0];

  return (
    <div className="max-w-md mx-aut">
      <ProductImage alt={title} source={product.photo || ""} />
      <div className="p-6">
        <ProductHeader title={title} specification={specification} />
        <ProductPricing prices={product.prices} className="mb-4" />
        <ProductInfoList
          isNew={product.isNew}
          order={product.order}
          serialNumber={product.serialNumber}
          status={product.status}
          className="space-y-2 mb-4"
        />
      </div>
    </div>
  )
}

ProductDetails.displayName = "ProductDetails";