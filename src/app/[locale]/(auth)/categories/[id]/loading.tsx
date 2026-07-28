import { BackButtonSkeleton, Container } from "@/shared";
import { PageHeaderSkeleton, ProductsListSkeleton } from "@/widgets";

export default function LoadingCategoriesId() {
  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeaderSkeleton
        action={<BackButtonSkeleton />}
      />
      <ProductsListSkeleton />
    </Container>
  )
}