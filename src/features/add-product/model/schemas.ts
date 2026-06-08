import { z } from 'zod'
import { ProductStatus } from '@prisma/client'

export const productCreateSchema = z.object({
  serialNumber: z.number({
    error: 'Serial number is required',
  })
    .int('Serial number must be integer')
    .positive('Serial number must be positive'),

  title: z.string()
    .min(1, 'Title is required'),

  locale: z.string()
    .min(1, 'Locale is required'),

  isNew: z.boolean(),

  status: z.nativeEnum(ProductStatus),

  order: z.number({
    error: 'Order must be a number',
  })
    .int('Order must be integer')
    .positive('Order must be positive')
    .optional(),

  photo: z.string()
    .url('Photo must be a valid URL')
    .optional()
    .or(z.literal('')),

  specification: z.string()
    .optional()
    .or(z.literal('')),

  categoryId: z.string()
    .uuid('Invalid category ID')
    .optional(),

  parishId: z.string()
    .uuid('Invalid parish ID')
    .min(1, 'Parish is required'),

  userId: z.string()
    .uuid('Invalid user ID')
    .optional(),

  priceUAH: z.number({
    error: 'Price must be a number',
  })
    .nonnegative('Price must be non-negative')
    .optional(),

  priceUSD: z.number({
    error: 'Price must be a number',
  })
    .nonnegative('Price must be non-negative')
    .optional(),
})

export type ProductCreateFormData = z.infer<typeof productCreateSchema>