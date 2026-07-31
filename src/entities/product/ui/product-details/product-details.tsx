import { ProductInfoList } from "./product-info-list";
import { ProductPricing } from "./product-pricing";
import { ProductHeader } from "./product-header";
import { ProductImage } from "./product-image";
import { ScrollArea } from "@/shared/ui";
import { ProductRental } from "./product-rental";
import { ProductAuthor } from "./product-author";
import { getProductPrimaryPrice } from "@/shared/lib";
import { hasCategory, hasParish, hasRental, hasUser, ProductWithRelationsShort, ProductWithRelationsWide } from "../../model/types";

interface ProductDetailsProps {
  product: ProductWithRelationsWide | ProductWithRelationsShort
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { title, specification } = product.translations[0];
  const { UAH, USD } = getProductPrimaryPrice(product.prices)
  const category = hasCategory(product) ? product.category.translations[0].title : null
  const parish = hasParish(product) ? product.parish.translations[0].title : null
  const rental = hasRental(product) ? product.rental : null
  const user = hasUser(product) ? product.user : null

  return (
    <div className="max-w-md mx-auto flex flex-col flex-1">
      <ProductImage
        alt={title}
        source={product.photo || ""}
        className="pb-2"
      />
      <div className="border-2 rounded-sm mt-3 p-2 ">
        <ScrollArea className="flex-1 min-h-0 h-60 sm:h-auto">
          <ProductHeader title={title} specification={specification} />
          <ProductPricing prices={{ UAH, USD }} className="mb-2 sm:mb-4" />
          <ProductInfoList
            isNew={product.isNew}
            order={product.order}
            serialNumber={product.serialNumber}
            status={product.status}
            category={category}
            parish={parish}
            className="space-y-2 mb-2"
          />
          {rental && <ProductRental className="mb-2" rental={{ endDate: rental.endDate, startDate: rental.startDate }} />}
          {user && <ProductAuthor name={user.name} />}
        </ScrollArea>
      </div>
    </div>
  )
}

ProductDetails.displayName = "ProductDetails";