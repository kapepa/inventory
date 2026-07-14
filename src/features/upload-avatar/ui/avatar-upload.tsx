"use client"

import { AuthenticatedUser, } from "@/features/auth"
import { CancelButton, cn, ImageUploadField, ImageUploadFieldRef, ResponsiveImage, SubmitButton, UPLOAD_LIMITS } from "@/shared"
import { memo, useRef } from "react"
import { useUploadAvatar } from "../model"
import { useTranslations } from "next-intl"

interface AvatarUploadProps {
  user: AuthenticatedUser
}

export const AvatarUpload = memo(
  ({ user }: AvatarUploadProps) => {
    const t = useTranslations("avatar-upload")
    const refImageUpload = useRef<ImageUploadFieldRef>(null)
    const {
      error, isLoading, currentUrl, selectedFile, setError, handleCancel, openFileDialog, handleFileChange, handleUpload
    } = useUploadAvatar({ user, refImageUpload })

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h3 className="font-semibold text-muted-foreground">{user.name}</h3>
          <span className="text-muted-foreground text-sm">{t("descriptions")}</span>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="w-32 h-32 cursor-pointer rounded-full border-4 border-background overflow-hidden rel"
            onClick={openFileDialog}
          >
            <ResponsiveImage
              source={currentUrl}
              alt={user.name || "User avatar"}
              aspectRatio="square"
              priority={true}
              className={cn(
                "shadow-lg",
                selectedFile ? "hidden" : "flex"
              )}
            />
            <ImageUploadField
              disabled={isLoading}
              ref={refImageUpload}
              maxSizeMB={UPLOAD_LIMITS.IMAGE_MAX_SIZE_MB}
              onChange={handleFileChange}
              checkError={setError}
              className={cn(
                "w-full h-full scale-105",
                selectedFile ? "flex" : "hidden"
              )}
            />
          </div>
          <div className="h-3">{error && <span className="text-destructive text-sm">{error}</span>}</div>
        </div>
        <div className="pt-1 grid grid-cols-2 gap-2">
          <CancelButton
            variant="simply-accent"
            className="p-4"
            disabled={isLoading || !selectedFile}
            onClick={handleCancel}
          >
            {t("buttons.reset")}
          </CancelButton>
          <SubmitButton
            variant="striking-accent"
            className="p-4"
            isLoading={isLoading}
            disabled={!selectedFile}
            onClick={handleUpload}
          >
            {t("buttons.send")}
          </SubmitButton>
        </div>
      </div>
    )
  }
)