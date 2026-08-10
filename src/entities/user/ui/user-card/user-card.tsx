import { cn } from "@/shared/lib/utils"
import { UserPublic } from "../../model/types"
import { ImageUserCell } from "../user-cells/image-user-cell"
import { NameUserCell } from "../user-cells/name-user-cell"
import { EmailUserCell } from "../user-cells/email-user-cell"
import { useTranslations } from "next-intl"

interface UserCardProps {
  className?: string,
  user: UserPublic,
}

export function UserCard({ className, user }: UserCardProps) {
  const t = useTranslations('user.user-card');

  return (
    <div
      className={cn(
        "border rounded-md bg-card hover:shadow-md transition-all w-full border-chart-1",
        "px-4 lg:px-6 py-3 lg:py-4 gap-3",
        className
      )}
    >
      <ImageUserCell url={user.imageUrl} name={user.name} />
      <div className="flex flex-col items-center justify-center gap-2">
        <NameUserCell name={user.name} label={t('name')} />
        <EmailUserCell email={user.email} label={t('email')} />
      </div>
    </div>
  )
}