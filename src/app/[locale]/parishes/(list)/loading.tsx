import { AddParishButtonSkeleton } from "@/features";
import { Container } from "@/shared";
import { PageHeaderSkeleton, ParishesListSkeleton } from "@/widgets";

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