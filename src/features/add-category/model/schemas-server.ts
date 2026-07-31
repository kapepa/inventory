import { VALIDATION_LIMITS } from "@/shared/constants"
import { z } from "zod"

export type CategoryhCreateServerValues = z.infer<typeof categoryCreateServerSchema>

export const categoryCreateServerSchema = z.object({
  translations: z.array(
    z.object({
      locale: z
        .string()
        .length(VALIDATION_LIMITS.LOCALE_LENGTH)
        .trim(),
      title: z
        .string()
        .min(VALIDATION_LIMITS.TITLE_MIN_CATEGORY)
        .max(VALIDATION_LIMITS.TITLE_MAX_CATEGORY)
        .trim(),
    })
  ).min(1)
})