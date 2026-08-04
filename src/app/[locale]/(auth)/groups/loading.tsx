import { AddParishButtonSkeleton } from "@/features/add-parish/ui/bricks/add-parish-button-skeleton";
import { Container } from "@/shared/ui";
import { GroupsListSkeleton } from "@/widgets/groups-list/ui/groups-list";
import { GroupsRelationsSkeleton } from "@/widgets/groups-relations/ui/groups-relations";
import { PageHeaderSkeleton } from "@/widgets/page-header/ui/page-header-skeleton";

export default function LoadingGroups() {
  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeaderSkeleton action={<AddParishButtonSkeleton />} />
      <div className="w-full mx-auto flex-1 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_4fr] gap-4 h-full">
          <GroupsListSkeleton />
          <GroupsRelationsSkeleton className="h-full" />
        </div>
      </div>
    </Container>
  )
}