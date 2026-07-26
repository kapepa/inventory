import { AddParishButtonSkeleton } from "@/features";
import { Container } from "@/shared";
import { GroupsListSkeleton, GroupsRelationsSkeleton, PageHeaderSkeleton } from "@/widgets";

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