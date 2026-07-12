import { AuthenticatedUser } from "@/features/auth"

interface AvatarUploadProps {
  user: AuthenticatedUser
}

export const AvatarUpload = ({ user }: AvatarUploadProps) => {
  return (
    <div>
      AvatarUpload
    </div>
  )
}

AvatarUpload.displayName = "AvatarUpload"