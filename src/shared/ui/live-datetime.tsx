"use client"

import * as React from "react"
import { Clock9 } from 'lucide-react'
import { Skeleton, useLiveTime } from '@/shared'

// ============ Types ============
interface LiveTimeContextValue {
  dayOfWeek: string
  date: string
  time: string
}

// ============ Context ============
const LiveTimeContext = React.createContext<LiveTimeContextValue | null>(null)

function useLiveTimeContext() {
  const context = React.useContext(LiveTimeContext)
  if (!context) {
    throw new Error('LiveDatetime components must be used within <LiveDatetime>')
  }
  return context
}

// ============ Root Component ============
const LiveDatetime = React.memo(
  ({ children, className, ...props }: React.ComponentProps<"div">) => {
    const liveTime = useLiveTime()

    if (!liveTime) return null

    return (
      <LiveTimeContext.Provider value={liveTime}>
        <div data-slot="live-datetime" className={className} {...props}>
          {children}
        </div>
      </LiveTimeContext.Provider>
    )
  }
)
LiveDatetime.displayName = "LiveDatetime"

// ============ Date Component ============
const LiveDatetimeDate = React.memo(
  ({ className, ...props }: React.ComponentProps<"div">) => {
    const { date } = useLiveTimeContext()

    return (
      <div data-slot="live-datetime-date" className={className} {...props}>
        <span className="whitespace-nowrap">{date}</span>
      </div>
    )
  }
)
LiveDatetimeDate.displayName = "LiveDatetime.Date"

const LiveDatetimeDateSkeleton = React.memo(
  ({ className }: React.ComponentProps<"div">) => {

    return (
      <div data-slot="live-datetime-date" className={className}>
        <Skeleton className="w-24 h-6" />
      </div>
    )
  }
)
LiveDatetimeDateSkeleton.displayName = "LiveDatetimeSkeleton.Date"

const LiveDatetimeWeek = React.memo(
  ({ className, ...props }: React.ComponentProps<"div">) => {
    const { dayOfWeek } = useLiveTimeContext()

    return (
      <div data-slot="live-datetime-date" className={className} {...props}>
        <span>{dayOfWeek}</span>
      </div>
    )
  }
)
LiveDatetimeWeek.displayName = "LiveDatetimeWeek.Date"

const LiveDatetimeWeekSkeleton = React.memo(
  ({ className }: React.ComponentProps<"div">) => {
    return (
      <div data-slot="live-datetime-date" className={className}>
        <Skeleton className="w-1/2 h-6" />
      </div>
    )
  }
)
LiveDatetimeWeekSkeleton.displayName = "LiveDatetimeWeekSkeleton.Date"

// ============ Time Component ============
const LiveDatetimeTime = React.memo(
  ({ className, ...props }: React.ComponentProps<"div">) => {
    const { time } = useLiveTimeContext()

    return (
      <div
        data-slot="live-datetime-time"
        className={`flex items-center gap-x-3 ${className || ''}`}
        {...props}
      >
        <Clock9 strokeWidth={3} className="w-4 h-4 text-accent" />
        <span className="min-w-11">{time}</span>
      </div>
    )
  }
)
LiveDatetimeTime.displayName = "LiveDatetime.Time"

const LiveDatetimeTimeSkeleton = React.memo(
  ({ className }: React.ComponentProps<"div">) => {
    return (
      <div
        data-slot="live-datetime-time"
        className={`flex items-center gap-x-3 ${className || ''}`}
      >
        <Clock9 strokeWidth={3} className="w-4 h-4 text-accent" />
        <Skeleton className="w-10 h-6" />
      </div>
    )
  }
)
LiveDatetimeTimeSkeleton.displayName = "LiveDatetimeSkeleton.Time"

export {
  LiveDatetime,
  LiveDatetimeDate,
  LiveDatetimeTime,
  LiveDatetimeWeek,
  LiveDatetimeDateSkeleton,
  LiveDatetimeTimeSkeleton,
  LiveDatetimeWeekSkeleton,
  useLiveTimeContext,
}
