import { ProductsExploreSkeleton } from "@/features/products-explore/ui/products-explore-skeleton";
import { BackButtonSkeleton } from "@/shared/ui/back-button";
import { Container } from "@/shared/ui/container";
import { Skeleton } from "@/shared/ui/skeleton";
import { PageHeaderSkeleton } from "@/widgets/page-header/ui/page-header-skeleton";
import { ProductsListSkeleton } from "@/widgets/products-list/ui/products-list-skeleton";

export default function LoadingParishesId() {
  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <ProductsExploreSkeleton
        className="pb-3"
      />
      <PageHeaderSkeleton subtitle={true} action={<BackButtonSkeleton />}>
        <Skeleton className="h-6 w-1/2" />
      </PageHeaderSkeleton>
      <ProductsListSkeleton />
    </Container>
  )
}