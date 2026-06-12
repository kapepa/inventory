import { z } from 'zod'
import { ProductStatus } from '@prisma/client'

type TranslationFunction = (key: string) => string

export const productCreateFormSchema = (t: TranslationFunction) => z.object({
  serialNumber: z.number({ error: t('serial-number-required') })
    .int(t('serial-number-integer'))
    .positive(t('serial-number-positive')),

  translations: z.object({
    ru: z.object({
      locale: z.literal('ru'),
      title: z.string().min(1, t('title-required')),
      specification: z.string().min(1, t('specification-required')),
    }),
    en: z.object({
      locale: z.literal('en'),
      title: z.string().min(1, t('title-required')),
      specification: z.string().min(1, t('specification-required')),
    }),
  }),

  isNew: z.boolean(),

  status: z.nativeEnum(ProductStatus),

  order: z.number({ message: t("order-must-required") })
    .int(t('order-must-integer'))
    .positive(t('order-must-positive')),

  photo: z.union([
    z.instanceof(File),
    z.string().url(t('upload-image')),
    z.literal('')
  ]).optional().nullable(),

  categoryId: z.string({ error: t('invalid-category') }).min(1, t('invalid-category')),

  parishId: z.string().min(1, 'Parish is required'),

  userId: z.string().optional(),

  priceUAH: z.number({ error: t("price-must-number") })
    .nonnegative(t('price-must-positive'))
    .positive(t('price-must-positive'))
    .optional(),

  priceUSD: z.number({ error: t("price-must-number") })
    .nonnegative(t('price-must-positive'))
    .positive(t('price-must-positive'))
    .optional(),
})

export type ProductCreateSchema = ReturnType<typeof productCreateFormSchema>
export type ProductCreateFormValues = z.infer<ProductCreateSchema>
export type TranslatableProductFieldName = 'title' | 'specification'