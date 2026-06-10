import { z } from "zod"

type TranslationFunction = (key: string) => string

export const createParishFormSchema = (t: TranslationFunction) => z.object({
  deliveryDate: z.date({
    message: t("err-date"),
  }),
  translations: z.object({
    ru: z.object({
      locale: z.literal('ru'),
      title: z.string().min(3, t("err-title-min")),
      description: z.string().min(3, t("err-description-min"))
    }),
    en: z.object({
      locale: z.literal('en'),
      title: z.string().min(3, t("err-title-min")),
      description: z.string().min(3, t("err-description-min"))
    }),
  })
});

export type ParishFormSchema = ReturnType<typeof createParishFormSchema>
export type TranslatableFieldName = 'title' | 'description'
export type ParishFormValues = z.infer<ParishFormSchema>
