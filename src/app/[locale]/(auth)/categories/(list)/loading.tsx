import { AddCategoryButtonSkeleton } from "@/features/add-category/ui";
import { Container } from "@/shared/ui";
import { CategoriesListSkeleton } from "@/widgets/categories-list";
import { PageHeaderSkeleton } from "@/widgets/page-header/ui/page-header";

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