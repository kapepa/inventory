import { z } from 'zod'
import { VALIDATION_LIMITS } from '@/shared'

export const avatarUploadServerSchema = z.object({
  image: z
    .string()
    .min(1)
    .max(VALIDATION_LIMITS.CLOUDINARY_MAX_URL),
  userId: z
    .string()
    .min(1)
    .max(VALIDATION_LIMITS.ID_MAX_LENGTH),
})

export type AvatarUploadServerValues = z.infer<typeof avatarUploadServerSchema>