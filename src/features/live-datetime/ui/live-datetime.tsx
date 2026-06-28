"use client";

import { Clock9 } from 'lucide-react';
import { useLiveTime } from '../model/use-live-time';
import { Skeleton } from '@/shared';
import { memo } from 'react';

interface LiveDatetimeProps {
  className?: string
}

export const LiveDatetime = memo(
  (props: LiveDatetimeProps) => {
    const liveTime = useLiveTime();

    if (!liveTime) {
      return (
        <div className={props.className}>
          <div className="inline-grid gap-x-6 gap-y-1 grid-rows-[auto_auto]">
            <div className="col-span-2">
              <Skeleton className="w-1/2 h-6" />
            </div>
            <div>
              <Skeleton className="w-24 h-6" />
            </div>
            <div
              className="flex items-center gap-x-3"
            >
              <Clock9 strokeWidth={3} className="w-4 h-4 text-accent" /> <Skeleton className="w-10 h-6" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={props.className}>
        <div className="inline-grid gap-x-3 gap-y-1 grid-rows-[auto_auto]">
          <span className="col-span-2 min-w-28">{liveTime.dayOfWeek}</span>
          <span className="whitespace-nowrap min-w-28">{liveTime.date}</span>
          <div
            className="flex items-center gap-x-3"
          >
            <Clock9 strokeWidth={3} className="w-4 h-4 text-accent" /> <span className='min-w-11'>{liveTime.time}</span>
          </div>
        </div>
      </div>
    );
  }
)