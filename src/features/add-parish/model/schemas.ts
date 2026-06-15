import { z } from "zod"

type TranslationFunction = (key: string) => string

export const createParishFormSchema = (t: TranslationFunction) => z.object({
  deliveryDate: z.date({
    message: t("delivery-date-required"),
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
export type ParishCreateServerValues = z.infer<typeof parishCreateServerSchema>

export const parishCreateServerSchema = z.object({
  deliveryDate: z.string().or(z.date()),
  translations: z.array(
    z.object({
      locale: z.string().length(2),
      title: z.string().min(3),
      description: z.string().min(3)
    })
  ).min(1)
})

