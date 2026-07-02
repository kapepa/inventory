import { getFirstLetter } from "../lib/get-first-letter"
import { getRandomColor } from "../lib/get-random-color"
import { cn } from "../lib/utils"
import { ResponsiveImage } from "./responsive-image"

interface ProfileAvatarProps {
  url?: string | null,
  name: string,
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
          priority
          unstyled={true}
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

ProfileAvatar