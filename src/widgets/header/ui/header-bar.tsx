"use client"

import { useMounted } from "@/shared/lib/hooks/use-mounted";
import { WebSocketProviderDynamic } from "@/shared/lib/providers/websocket-provider-dynamic";
import { OnlineUsersCount } from "@/shared/ui/online-users-count";
import { OnlineUsersCountSkeleton } from "@/shared/ui/online-users-count-skeleton";
import { LiveDatetime, LiveDatetimeDate, LiveDatetimeDateSkeleton, LiveDatetimeTime, LiveDatetimeTimeSkeleton, LiveDatetimeWeek, LiveDatetimeWeekSkeleton } from "@/shared/ui/live-datetime";
import { memo } from "react";

interface HeaderBarProps {
  showOnline: boolean,
  className?: string
}

export const HeaderBar = memo(({ showOnline, className }: HeaderBarProps) => {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div>
        <div className={className}>
          <div className="grid grid-cols-2 gap-x-3 gap-1 min-w-56">
            <div className="flex flex-col gap-y-1">
              <LiveDatetimeWeekSkeleton />
              <LiveDatetimeDateSkeleton />
            </div>
            <div className="flex flex-col gap-y-1 items-stretch">
              <div className="grow">
                {showOnline && <OnlineUsersCountSkeleton />}
              </div>
              <LiveDatetimeTimeSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <LiveDatetime className={className}>
        <div className="grid grid-cols-2 gap-x-3 gap-1 min-w-56">
          <div className="flex flex-col gap-y-1">
            <LiveDatetimeWeek />
            <LiveDatetimeDate />
          </div>
          <div className="flex flex-col gap-y-1 items-stretch">
            <div className="grow">
              {showOnline && (
                <WebSocketProviderDynamic>
                  <OnlineUsersCount />
                </WebSocketProviderDynamic>
              )}
            </div>
            <LiveDatetimeTime />
          </div>
        </div>
      </LiveDatetime>
    </div>
  );
})

HeaderBar.displayName = "HeaderBar"
