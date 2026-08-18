import { z } from 'zod'
import { ProductStatus } from '@prisma/client'
import { VALIDATION_LIMITS } from '@/shared/constants/validation'
import { TranslationFunction } from '@/shared/types/translation'

export const productCreateFormSchema = (t: TranslationFunction) => z.object({
  serialNumber: z.string({ error: t('err-serial-required') })
    .min(VALIDATION_LIMITS.SERIAL_NUM_MIN_PRODUCT, t("err-serial-min"))
    .max(VALIDATION_LIMITS.SERIAL_NUM_MAX_PRODUCT, t("err-serial-max"))
    .trim(),

  translations: z.object({
    ru: z.object({
      locale: z.literal('ru'),
      title: z
        .string()
        .min(VALIDATION_LIMITS.TITLE_MIN_PRODUCT, t('err-title-min'))
        .max(VALIDATION_LIMITS.TITLE_MAX_PRODUCT, t('err-title-max'))
        .trim(),
      specification: z
        .string()
        .min(VALIDATION_LIMITS.SPECIFICATION_MIN_PRODUCT, t('err-specification-min'))
        .max(VALIDATION_LIMITS.SPECIFICATION_MAX_PRODUCT, t('err-specification-max'))
        .trim(),
    }),
    en: z.object({
      locale: z.literal('en'),
      title: z
        .string()
        .min(VALIDATION_LIMITS.TITLE_MIN_PRODUCT, t('err-title-min'))
        .max(VALIDATION_LIMITS.TITLE_MAX_PRODUCT, t('err-title-max'))
        .trim(),
      specification: z
        .string()
        .min(VALIDATION_LIMITS.SPECIFICATION_MIN_PRODUCT, t('err-specification-min'))
        .max(VALIDATION_LIMITS.SPECIFICATION_MAX_PRODUCT, t('err-specification-max'))
        .trim(),
    }),
  }),

  isNew: z.boolean(),

  status: z.nativeEnum(ProductStatus),

  order: z
    .number({ message: t("err-order-required") })
    .int(t('err-order-integer'))
    .positive(t('err-order-positive'))
    .max(VALIDATION_LIMITS.ORDER_MAX_PRODUCT, t('err-order-max')),

  photo: z.union([
    z.instanceof(File, { message: t('err-image-upload') }),
    z.string().min(1, t('err-image-upload'))
  ], { message: t('err-image-upload') }),

  categoryId: z
    .string({ error: t('err-category-invalid') })
    .min(1, t('err-category-invalid'))
    .max(VALIDATION_LIMITS.ID_MAX_LENGTH)
    .trim(),

  parishId: z
    .string()
    .min(1, t("err-parish-invalid"))
    .max(VALIDATION_LIMITS.ID_MAX_LENGTH)
    .trim(),

  userId: z
    .string()
    .max(VALIDATION_LIMITS.ID_MAX_LENGTH)
    .optional(),

  priceUAH: z.
    number({ error: t("err-price-required") })
    .nonnegative(t('err-price-nonnegative'))
    .positive(t('err-price-positive'))
    .max(VALIDATION_LIMITS.PRICE_MAX_VALUE, t('err-price-max')),

  priceUSD: z.
    number({ error: t("err-price-required") })
    .nonnegative(t('err-price-nonnegative'))
    .positive(t('err-price-positive'))
    .max(VALIDATION_LIMITS.PRICE_MAX_VALUE, t('err-price-max')),
})

export type ProductCreateSchema = ReturnType<typeof productCreateFormSchema>
export type ProductCreateFormValues = z.infer<ProductCreateSchema>
export type TranslatableProductFieldName = 'title' | 'specification'