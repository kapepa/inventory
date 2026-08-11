import { BackButtonSkeleton } from "@/shared/ui/back-button";
import { Container } from "@/shared/ui/container";
import { PageHeaderSkeleton } from "@/widgets/page-header/ui/page-header-skeleton";
import { ProductsListSkeleton } from "@/widgets/products-list/ui/products-list-skeleton";

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