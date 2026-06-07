import { ResponsiveImage } from "@/shared";
import { ProductsWithRelations } from "../../model";

interface ProductDetailsProps {
  products: ProductsWithRelations
}

export const ProductDetails = ({ products }: ProductDetailsProps) => {
  const { title, specification } = products.translations[0];
  console.log(products)

  return (
    <div className="max-w-md mx-aut">
      <div className="relative">
        <ResponsiveImage
          source={products.photo || ""}
          alt={title}
          aspectRatio="auto"
          className="w-full h-64"
          priority
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
            REPAIR
          </span>
          <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
            NEW
          </span>
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-xl font-bold text-gray-800 mb-2">
          {title}
        </h4>
        <p className="text-gray-600 text-sm mb-4">
          {specification}
        </p>

        <div className="flex items-baseline gap-4 mb-4">,
          <span className="text-3xl font-bold text-gray-900">10 $</span>
          <span className="text-lg text-gray-500">≈ 15 999.6 ₴</span>
        </div>

        {/* Характеристики */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Serial Number</span>
            <span className="font-semibold text-gray-800">#3002</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Order</span>
            <span className="font-semibold text-gray-800">#10</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <span className="font-semibold text-red-600">REPAIR</span>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductDetails.displayName = "ProductDetails";