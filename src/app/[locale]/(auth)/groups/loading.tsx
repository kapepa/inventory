import { AddParishButtonSkeleton } from "@/features/add-parish/ui/bricks/add-parish-button-skeleton";
import { GroupsListSkeleton } from "@/widgets/groups-list/ui/groups-list-skeleton";
import { PageHeaderSkeleton } from "@/widgets/page-header/ui/page-header-skeleton";

export default function LoadingGroups() {
  return (
    <>
      <PageHeaderSkeleton
        action={<AddParishButtonSkeleton />}
        className="col-span-1 lg:col-span-3 pb-0"
      />
      <div
        className="h-full w-full max-w-lg m-auto col-span-1"
      >
        <div className="w-full max-w-lg m-auto lg:m-0">
          <GroupsListSkeleton className="h-full w-full max-w-lg" />
        </div>
      </div>
    </>
  )
}