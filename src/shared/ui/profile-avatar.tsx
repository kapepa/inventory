import Image from "next/image"
import { getFirstLetter } from "../lib/get-first-letter"
import { getRandomColor } from "../lib/get-random-color"
import { cn } from "../lib/utils"


interface ProfileAvatarProps {
  url?: string,
  name: string,
  className?: string,
  size?: number
}

export const ProfileAvatar = ({ url, name, size = 120, className }: ProfileAvatarProps) => {
  if (url) {
    return (
      <div className={cn("rounded-full h-full w-full overflow-hidden relative", className)}>
        <Image
          src={url}
          alt={`${name}'s avatar`}
          fill
          sizes={`${size}px`}
          className="object-cover"
          priority
          loading="eager"
        />
      </div>
    )
  }

  const getLetter = getFirstLetter(name)
  const getColor = getRandomColor(name)

  return (
    <div className={cn("rounded-full h-full w-full bg-chart-2 flex items-center justify-center text-3xl", getColor, className)}>
      <span className="text-white" >{getLetter}</span>
    </div>
  )
}