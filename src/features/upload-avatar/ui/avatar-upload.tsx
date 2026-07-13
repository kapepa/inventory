"use client"

import { AuthenticatedUser, useAuthStore } from "@/features/auth"
import { Button, CancelButton, cn, ImageUploadField, ImageUploadFieldRef, ResponsiveImage, SubmitButton, UPLOAD_LIMITS } from "@/shared"
import { useCallback, useRef, useState, useTransition } from "react"
// import { useUploadAvatar } from "../model"

import { useTranslations } from "next-intl"
import { requestUploadAvatar } from "../api"
import { useUpload } from "@/entities"

interface AvatarUploadProps {
  user: AuthenticatedUser
}

export const AvatarUpload = ({ user }: AvatarUploadProps) => {
  const t = useTranslations("avatar-upload")
  const refImageUpload = useRef<ImageUploadFieldRef>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { upload } = useUpload()
  // const { uploadAvatar, isPending } = useUploadAvatar()

  const handleFileChange = useCallback((file: File | null) => {
    setSelectedFile(file)
  }, [])

  const handleUpload = useCallback(() => {
    if (!selectedFile) return
    startTransition(async () => {
      try {
        const uploadData = await upload(selectedFile)
        await requestUploadAvatar({ data: { image: uploadData, userId: user.id } })
        if (uploadData) useAuthStore.getState().setUser({ ...user, imageUrl: uploadData })
        setSelectedFile(null)
        refImageUpload.current?.clear()
      } catch (error) {
        console.log(error)
      }
    })
  }, [selectedFile, upload, requestUploadAvatar])

  const handleCancel = useCallback(() => {
    setSelectedFile(null)
    refImageUpload.current?.clear()
  }, [setSelectedFile])

  const openFileDialog = () => {
    refImageUpload.current?.click()
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h3 className="font-semibold text-muted-foreground">{user.name}</h3>
        <span className="text-muted-foreground text-sm">{t("descriptions")}</span>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="w-32 h-32 cursor-pointer rounded-full border-4 border-background overflow-hidden"
          onClick={openFileDialog}
        >
          <ResponsiveImage
            source={user.imageUrl}
            alt={user.name || "User avatar"}
            aspectRatio="square"
            className={cn(
              "shadow-lg",
              !!selectedFile ? "hidden" : "flex"
            )}
          />
          <ImageUploadField
            // disabled={isPending}
            ref={refImageUpload}
            maxSizeMB={UPLOAD_LIMITS.IMAGE_MAX_SIZE_MB}
            onChange={handleFileChange}
            checkError={setError}
            className={cn(
              "w-full h-full scale-105",
              !!selectedFile ? "flex" : "hidden"
            )}
          />
        </div>
        <div className="h-3">{error && <span className="text-destructive text-sm">{error}</span>}</div>
      </div>
      <div className="pt-1 grid grid-cols-2 gap-2">
        <CancelButton
          variant="simply-accent"
          className="p-4"
          disabled={isPending}
          onClick={handleCancel}
        >
          {t("buttons.reset")}
        </CancelButton>
        <SubmitButton
          variant="striking-accent"
          className="p-4"
          isLoading={isPending}
          onClick={handleUpload}
        >
          {t("buttons.send")}
        </SubmitButton>
      </div>
    </div>

  )
}