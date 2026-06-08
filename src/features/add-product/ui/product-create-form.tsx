"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productCreateSchema, ProductCreateFormData } from '../model'
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@/shared'
import { useTranslations } from 'next-intl'
import { useProductCreate } from '../model/hooks/use-product-create'
import { ProductStatus } from '@prisma/client'

interface ProductCreateFormProps {
  parishId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export const ProductCreateForm = ({ parishId, onSuccess, onCancel }: ProductCreateFormProps) => {
  const t = useTranslations('products.create-form')
  const { createProduct, isLoading } = useProductCreate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductCreateFormData>({
    resolver: zodResolver(productCreateSchema),
    mode: "onChange",
    defaultValues: {
      parishId,
      title: "",
      serialNumber: NaN,
      isNew: true,
      status: ProductStatus.FREE,
      locale: 'en',
    },
  })

  const onSubmit = async (data: ProductCreateFormData) => {
    try {
      await createProduct(data)
      onSuccess?.()
    } catch (error) {
      // Error handled in hook
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div>
        <Label htmlFor="title">{t('title')} *</Label>
        <Input
          id="title"
          {...register('title')}
          placeholder={t('title-placeholder')}
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Serial Number */}
      <div>
        <Label htmlFor="serialNumber">{t('serial-number')} *</Label>
        <Input
          id="serialNumber"
          type="number"
          {...register('serialNumber', { valueAsNumber: true })}
          placeholder={t('serial-number-placeholder')}
          disabled={isLoading}
        />
        {errors.serialNumber && (
          <p className="text-sm text-destructive mt-1">{errors.serialNumber.message}</p>
        )}
      </div>

      {/* Specification */}
      <div>
        <Label htmlFor="specification">{t('specification')}</Label>
        <Textarea
          id="specification"
          {...register('specification')}
          placeholder={t('specification-placeholder')}
          disabled={isLoading}
          rows={3}
        />
        {errors.specification && (
          <p className="text-sm text-destructive mt-1">{errors.specification.message}</p>
        )}
      </div>

      {/* Order */}
      <div>
        <Label htmlFor="order">{t('order')}</Label>
        <Input
          id="order"
          type="number"
          {...register('order', { valueAsNumber: true })}
          placeholder={t('order-placeholder')}
          disabled={isLoading}
        />
        {errors.order && (
          <p className="text-sm text-destructive mt-1">{errors.order.message}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <Label htmlFor="status">{t('status')}</Label>
        <Select
          value={watch('status')}
          onValueChange={(value) => setValue('status', value as ProductStatus)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('status-placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ProductStatus.FREE}>{t('status-free')}</SelectItem>
            <SelectItem value={ProductStatus.BUSY}>{t('status-busy')}</SelectItem>
            <SelectItem value={ProductStatus.REPAIR}>{t('status-repair')}</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-destructive mt-1">{errors.status.message}</p>
        )}
      </div>

      {/* Condition */}
      <div>
        <Label htmlFor="isNew">{t('condition')}</Label>
        <Select
          value={watch('isNew') ? 'new' : 'used'}
          onValueChange={(value) => setValue('isNew', value === 'new')}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">{t('condition-new')}</SelectItem>
            <SelectItem value="used">{t('condition-used')}</SelectItem>
          </SelectContent>
        </Select>
        {errors.isNew && (
          <p className="text-sm text-destructive mt-1">{errors.isNew.message}</p>
        )}
      </div>

      {/* Photo URL */}
      <div>
        <Label htmlFor="photo">{t('photo-url')}</Label>
        <Input
          id="photo"
          {...register('photo')}
          placeholder={t('photo-url-placeholder')}
          disabled={isLoading}
        />
        {errors.photo && (
          <p className="text-sm text-destructive mt-1">{errors.photo.message}</p>
        )}
      </div>

      {/* Prices */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="priceUAH">{t('price-uah')}</Label>
          <Input
            id="priceUAH"
            type="number"
            step="0.01"
            {...register('priceUAH', { valueAsNumber: true })}
            placeholder="0.00"
            disabled={isLoading}
          />
          {errors.priceUAH && (
            <p className="text-sm text-destructive mt-1">{errors.priceUAH.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="priceUSD">{t('price-usd')}</Label>
          <Input
            id="priceUSD"
            type="number"
            step="0.01"
            {...register('priceUSD', { valueAsNumber: true })}
            placeholder="0.00"
            disabled={isLoading}
          />
          {errors.priceUSD && (
            <p className="text-sm text-destructive mt-1">{errors.priceUSD.message}</p>
          )}
        </div>
      </div>

      {/* Locale (hidden) */}
      <input type="hidden" {...register('locale')} />

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            {t('cancel')}
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('creating') : t('create')}
        </Button>
      </div>
    </form>
  )
}