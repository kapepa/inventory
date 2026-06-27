import { CategoryWithProductCount } from "@/entities";

interface CategoriesListProps {
  className?: string
  initialHasMore: boolean
  initialCategories: CategoryWithProductCount[]
}

export const CategoriesList = ({ className, initialHasMore, initialCategories }: CategoriesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {initialCategories.map((category) => (
        <div key={category.id} className="border rounded-lg p-4">
          <h3 className="font-semibold">
            {category.translations[0]?.title || 'Untitled'}
          </h3>
          <p className="text-sm text-muted-foreground">
            Products: {category._count.products}
          </p>
        </div>
      ))}
    </div>
  );
}

CategoriesList.displayName = "CategoriesList"