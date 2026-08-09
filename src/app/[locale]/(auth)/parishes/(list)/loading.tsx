import { AddParishButtonSkeleton } from "@/features/add-parish/ui/bricks/add-parish-button-skeleton";
import { Container } from "@/shared/ui/container";
import { PageHeaderSkeleton } from "@/widgets/page-header/ui/page-header-skeleton";
import { ParishesListSkeleton } from "@/widgets/parishes-list/ui/parishes-list";

export default function LoadingParishes() {
  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeaderSkeleton
        action={<AddParishButtonSkeleton />}
      />
      <ParishesListSkeleton />
    </Container>
  )
}