"use client"

import { getFirstLetter } from "../lib/get-first-letter"
import { getRandomColor } from "../lib/get-random-color"
import { cn } from "../lib/utils"
import { ResponsiveImage } from "./responsive-image"
import { Skeleton } from "./skeleton"

interface ProfileAvatarProps {
  url?: string | null,
  name?: string,
  className?: string,
  size?: number
}

export const ProfileAvatar = ({ url, name, className }: ProfileAvatarProps) => {
  if (url) {
    return (
      <div className={cn("rounded-full h-full w-full overflow-hidden relative", className)}>
        <ResponsiveImage
          source={url}
          alt={`${name}'s avatar`}
          className="object-cover"
          aspectRatio="square"
          priority
          unstyled={true}
        />
      </div>
    )
  }

  const getColor = getRandomColor(name)
  const getLetter = getFirstLetter(name)

  return (
    <div className={cn("rounded-full h-full w-full bg-chart-2 flex items-center justify-center text-3xl", getColor, className)} suppressHydrationWarning>
      <span className="text-white" >{getLetter}</span>
    </div>
  )
}

ProfileAvatar.displayName = "ProfileAvatar"

export const ProfileAvatarSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("rounded-full h-full w-full overflow-hidden", className)} />
  )
}

ProfileAvatarSkeleton.displayName = "ProfileAvatarSkeleton"
