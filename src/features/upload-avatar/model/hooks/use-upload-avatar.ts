"use client"

import { RefObject, useCallback, useMemo, useState, useTransition } from "react"
import { useUpload } from "@/entities"
import { ForbiddenError, formatResponsiveImage, ImageUploadFieldRef } from "@/shared"
import { useAuthStore } from "@/features/auth"
import type { AuthenticatedUser } from "@/features/auth"
import { requestUploadAvatar } from "../../api"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

interface UseUploadAvatarProps {
  user: AuthenticatedUser,
  refImageUpload: RefObject<ImageUploadFieldRef | null>
}

export const useUploadAvatar = ({ user, refImageUpload }: UseUploadAvatarProps) => {
  const t = useTranslations("avatar-upload.toast")
  const [currentUrl, setCurrentUrl] = useState<string | null>(user.imageUrl)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { upload } = useUpload()

  const handleFileChange = useCallback((file: File | null) => {
    setSelectedFile(file)
  }, [])

  const handleCancel = useCallback(() => {
    setSelectedFile(null)
    refImageUpload.current?.clear()
  }, [setSelectedFile])

  const handleUpload = useCallback(() => {
    if (!selectedFile) return
    startTransition(async () => {
      try {
        const uploadData = await upload(selectedFile)
        const imageUrl = formatResponsiveImage(uploadData)

        await requestUploadAvatar({ data: { image: imageUrl, userId: user.id } })

        useAuthStore.getState().setUser({ ...user, imageUrl })
        setCurrentUrl(imageUrl)

        queueMicrotask(() => {
          handleCancel()
          toast.success(t("success-updated"))
        })
      } catch (error) {
        if (error instanceof ForbiddenError) {
          toast.error(t("only-own-avatar-updated"))
        }
        toast.error(t("error-general-avatar-updated"))
        console.log(error)
      }
    })
  }, [selectedFile, upload, user])

  const openFileDialog = () => {
    refImageUpload.current?.click()
  }

  return useMemo(() => ({
    error,
    currentUrl,
    selectedFile,
    isLoading: isPending,
    setError,
    handleCancel,
    handleUpload,
    openFileDialog,
    handleFileChange,
  }), [currentUrl, selectedFile, error, isPending, setError, handleCancel, openFileDialog, handleFileChange, handleUpload])
}