import { z } from 'zod'
import { ProductStatus } from '@prisma/client'

type TranslationFunction = (key: string) => string

export const createProductCreateSchema = (t: TranslationFunction) => z.object({
  serialNumber: z.coerce.number({
    message: t('serial-number-required'),
  })
    .int(t('serial-number-integer'))
    .positive(t('serial-number-positive')),

  translations: z.object({
    ru: z.object({
      locale: z.literal('ru'),
      title: z.string().min(1, t('title-required')),
      specification: z.string().optional().or(z.literal('')),
    }),
    en: z.object({
      locale: z.literal('en'),
      title: z.string().min(1, t('title-required')),
      specification: z.string().optional().or(z.literal('')),
    }),
  }),

  isNew: z.boolean(),

  status: z.nativeEnum(ProductStatus),

  order: z.coerce.number({
    message: t('order-must-number'),
  })
    .int(t('order-must-integer'))
    .positive(t('order-must-positive'))
    .optional(),

  photo: z.union([
    z.instanceof(File),
    z.string().url(t('upload-image')),
    z.literal('')
  ]).optional().nullable(),

  categoryId: z.string()
    .uuid(t('invalid-category'))
    .optional(),

  parishId: z.string()
    .uuid('Invalid parish ID')
    .min(1, 'Parish is required'),

  userId: z.string()
    .uuid('Invalid user ID')
    .optional(),

  priceUAH: z.coerce.number({
    message: t('price-must-number'),
  })
    .nonnegative(t('price-must-numbernon-negative'))
    .optional(),

  priceUSD: z.coerce.number({
    message: t('price-must-number'),
  })
    .nonnegative(t('price-must-numbernon-negative'))
    .optional(),
})

export type ProductCreateSchema = ReturnType<typeof createProductCreateSchema>
export type ProductCreateFormValues = z.infer<ProductCreateSchema>
export type TranslatableProductFieldName = 'title' | 'specification'