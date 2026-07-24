"use client"

import {
  LiveDatetime,
  LiveDatetimeDate,
  LiveDatetimeTime,
  LiveDatetimeWeek,
  OnlineUsersCount,
  LiveDatetimeDateSkeleton,
  LiveDatetimeTimeSkeleton,
  LiveDatetimeWeekSkeleton,
  useMounted,
  OnlineUsersCountSkeleton,
  cn
} from "@/shared";


interface HeaderBarProps {
  showOnline: boolean,
  className?: string
}

export const HeaderBar = ({ showOnline, className }: HeaderBarProps) => {
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
              {showOnline && <OnlineUsersCount />}
            </div>
            <LiveDatetimeTime />
          </div>
        </div>
      </LiveDatetime>
    </div>
  );
}

HeaderBar.displayName = "HeaderBar"
