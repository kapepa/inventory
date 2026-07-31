import { ProductsExploreSkeleton } from "@/features/products-explore/ui/products-explore";
import { Container } from "@/shared/ui";
import { PageHeaderSkeleton } from "@/widgets/page-header/ui/page-header";
import { ProductsListSkeleton } from "@/widgets/products-list/ui/products-list";

export default function LoadingProducts() {
  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <ProductsExploreSkeleton
        className="pb-3"
      />
      <PageHeaderSkeleton subtitle={true} />
      <ProductsListSkeleton />
    </Container>
  )
}