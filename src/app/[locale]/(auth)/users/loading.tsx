import { Container } from "@/shared/ui";
import { PageHeaderSkeleton } from "@/widgets/page-header/ui/page-header-skeleton";
import { UsersListSkeleton } from "@/widgets/users-list/ui/users-list";

export default function LoadingUsers() {
  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeaderSkeleton />
      <UsersListSkeleton />
    </Container>
  )
}