import { BackButtonSkeleton, Container } from "@/shared/ui";
import { PageHeaderSkeleton } from "@/widgets/page-header/ui/page-header-skeleton";
import { ProductsListSkeleton } from "@/widgets/products-list/ui/products-list";

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