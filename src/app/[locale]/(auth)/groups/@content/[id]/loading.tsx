import { isMobileDevice } from "@/shared/lib/device/is-mobile-device";
import { XButtonCloseSkeleton } from "@/shared/ui/x-button-close";
import { headers } from "next/headers";

export default async function LoadingGroupsContent() {
  const headersList = await headers();
  const isMobile = isMobileDevice(headersList.get("user-agent") || "");

  if (isMobile) return null;

  return (
    <div className="border rounded-md bg-card min-w-full col-span-2 relative">
      <XButtonCloseSkeleton className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2" />
    </div>
  )

}