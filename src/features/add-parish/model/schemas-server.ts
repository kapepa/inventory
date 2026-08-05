import { VALIDATION_LIMITS } from "@/shared/constants/validation"
import { z } from "zod"

export const parishCreateServerSchema = z.object({
  deliveryDate: z.string().or(z.date()),
  translations: z.array(
    z.object({
      locale: z
        .string()
        .length(VALIDATION_LIMITS.LOCALE_LENGTH)
        .trim(),
      title: z
        .string()
        .min(VALIDATION_LIMITS.TITLE_MIN_PARISH)
        .max(VALIDATION_LIMITS.TITLE_MAX_PARISH)
        .trim(),
      description: z
        .string()
        .min(VALIDATION_LIMITS.DESC_MIN_PARISH)
        .max(VALIDATION_LIMITS.DESC_MAX_PARISH)
    })
  ).min(1)
})

export type ParishCreateServerValues = z.infer<typeof parishCreateServerSchema>