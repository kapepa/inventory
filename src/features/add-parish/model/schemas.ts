import { VALIDATION_LIMITS } from "@/shared";
import { z } from "zod"

type TranslationFunction = (key: string) => string

export const createParishFormSchema = (t: TranslationFunction) => z.object({
  deliveryDate: z.date({
    message: t("delivery-date-required"),
  }),
  translations: z.object({
    ru: z.object({
      locale: z
        .literal('ru'),
      title: z
        .string()
        .min(VALIDATION_LIMITS.TITLE_MIN_PARISH, t("err-title-min"))
        .max(VALIDATION_LIMITS.TITLE_MAX_PARISH, t("err-title-max"))
        .trim(),
      description: z
        .string()
        .min(VALIDATION_LIMITS.DESC_MIN_PARISH, t("err-description-min"))
        .max(VALIDATION_LIMITS.DESC_MAX_PARISH, t("err-description-max"))
        .trim(),
    }),
    en: z.object({
      locale: z.literal('en'),
      title: z.string().min(3, t("err-title-min")).max(100),
      description: z.string().min(3, t("err-description-min")).max(400)
    }),
  })
});

export type ParishFormSchema = ReturnType<typeof createParishFormSchema>
export type TranslatableFieldName = 'title' | 'description'
export type ParishFormValues = z.infer<ParishFormSchema>
export type ParishCreateServerValues = z.infer<typeof parishCreateServerSchema>

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

