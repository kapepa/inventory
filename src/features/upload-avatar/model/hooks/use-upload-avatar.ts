"use client"

// import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { uploadAvatar } from "../../api/avatar-api"
// import { useToast } from "@/shared/ui/use-toast"
// import { useTranslations } from "next-intl"

// export const useUploadAvatar = () => {
//   const queryClient = useQueryClient()
//   const { toast } = useToast()
//   const t = useTranslations("avatar-upload")

//   return useMutation({
//     mutationFn: (file: File) => uploadAvatar(file),
//     onSuccess: (data) => {
//       // Инвалидируем кеш пользователя, чтобы подтянуть новый аватар
//       queryClient.invalidateQueries({ queryKey: ["user"] })

//       toast({
//         title: t("success"),
//         description: t("avatar-uploaded-successfully"),
//       })
//     },
//     onError: (error: Error) => {
//       toast({
//         title: t("error"),
//         description: error.message || t("upload-failed"),
//         variant: "destructive",
//       })
//     },
//   })
// }