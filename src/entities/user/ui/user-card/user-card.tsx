"use client"

import { cn } from "@/shared"
import { UserPublic } from "../../model"
import { EmailUserCell, ImageUserCell, ImageUserCellSkeleton, NameUserCell, NameUserCellSkeleton, EmailUserCellSkeleton } from "../user-cells"
import { useTranslations } from "next-intl"

interface UserCardProps {
  className?: string,
  user: UserPublic,
}

export const UserCard = ({ className, user }: UserCardProps) => {
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

UserCard.displayName = "UserCard"

export const UserCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "border rounded-md bg-card hover:shadow-md transition-all w-full border-chart-1",
        "px-4 lg:px-6 py-3 lg:py-4 gap-3",
        className
      )}
    >
      <ImageUserCellSkeleton className="mx-auto" />
      <div className="flex flex-col items-center justify-center gap-2">
        <NameUserCellSkeleton />
        <EmailUserCellSkeleton />
      </div>
    </div>
  )
}

UserCardSkeleton.displayName = "UserCardSkeleton"