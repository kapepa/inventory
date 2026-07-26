import { ProductsExploreSkeleton } from "@/features";
import { Container } from "@/shared";
import { PageHeaderSkeleton, ProductsListSkeleton } from "@/widgets";

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