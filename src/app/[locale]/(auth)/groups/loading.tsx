import { AddParishButtonSkeleton } from "@/features/add-parish/ui/bricks/add-parish-button-skeleton";
import { Container } from "@/shared/ui/container";
import { GroupsListSkeleton } from "@/widgets/groups-list/ui/groups-list-skeleton";
import { PageHeaderSkeleton } from "@/widgets/page-header/ui/page-header-skeleton";

export default function LoadingGroups() {
  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeaderSkeleton action={<AddParishButtonSkeleton />} />
      <div className="w-full lg:flex min-h-0 flex mx-auto lg:mx-0">
        <div className="w-full max-w-lg m-auto lg:m-0">
          <GroupsListSkeleton className="h-full w-full max-w-lg" />
        </div>
      </div>
    </Container>
  )
}