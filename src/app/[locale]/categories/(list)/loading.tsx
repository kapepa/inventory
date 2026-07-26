import { AddCategoryButtonSkeleton } from "@/features";
import { Container } from "@/shared";
import { CategoriesListSkeleton, PageHeaderSkeleton } from "@/widgets";

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