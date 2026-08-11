import { cn } from "@/shared/lib/utils";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";

interface ImageUserCellProps {
  url?: string | null;
  name: string
  className?: string;
}

export const ImageUserCell = ({ url, name, className }: ImageUserCellProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <ProfileAvatar url={url} name={name} className="size-20" />
    </div>
  )
}

ImageUserCell.displayName = "ImageUserCell"