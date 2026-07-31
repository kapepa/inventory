import { AddParishButtonSkeleton } from "@/features/add-parish/ui/add-parish-button";
import { Container } from "@/shared/ui";
import { PageHeaderSkeleton } from "@/widgets/page-header/ui/page-header";
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