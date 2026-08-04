import { AddCategoryButtonSkeleton } from "@/features/add-category/ui/bricks/add-category-button-skeleton";
import { Container } from "@/shared/ui";
import { CategoriesListSkeleton } from "@/widgets/categories-list";
import { PageHeaderSkeleton } from "@/widgets/page-header/ui/page-header-skeleton";

export default function LoadingCategoriesList() {
  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeaderSkeleton
        action={<AddCategoryButtonSkeleton />}
      />
      <CategoriesListSkeleton />
    </Container>
  )
}