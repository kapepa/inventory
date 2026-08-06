import { AddParishButtonSkeleton } from "@/features/add-parish/ui/bricks/add-parish-button-skeleton";
import { Container } from "@/shared/ui";
import { GroupsListSkeleton } from "@/widgets/groups-list/ui/groups-list";
import { GroupsRelationsSkeleton } from "@/widgets/groups-relations/ui/groups-relations-skeleton";
import { PageHeaderSkeleton } from "@/widgets/page-header/ui/page-header-skeleton";

export default function LoadingGroups() {
  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeaderSkeleton action={<AddParishButtonSkeleton />} />
      <div className="w-full mx-auto flex-1 min-h-0 flex justify-center">
        <div className="w-full max-w-lg m-auto">
          <GroupsListSkeleton className="h-full w-full" />
          <GroupsRelationsSkeleton className="h-full hidden lg:flex" />
        </div>
      </div>
    </Container>
  )
}