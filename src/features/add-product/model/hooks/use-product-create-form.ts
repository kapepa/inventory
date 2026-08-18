"use client"
import { useCallback, useMemo, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/shared/ui/sonner"
import { useTranslations } from "next-intl"
import { ProductCreateFormValues, productCreateFormSchema } from "../schemas-client"
import { ProductStatus } from "@prisma/client"
import { useSyncFormWithStorage } from "./use-sync-form-with-storage"
import { requestСreateProduct } from "../../api"
import { ProductCreateInput } from "../types"
import { STORAGE_KEYS } from "@/shared/constants/storage-keys"
import { AlreadyExistsError } from "@/shared/lib/errors"
import { ProductWithRelations } from "@/entities/product/model/types"
import { useUpload } from "@/entities/upload/model/hooks/use-upload"
import { formatResponsiveImage } from "@/shared/lib/image-utils"
import { emitProductAdded } from "@/shared/lib/events/product-events"

const ADD_PRODUCT_FORM_DATA = STORAGE_KEYS.ADD_PRODUCT_FORM_DATA

export const useProductCreateForm = (parishId: string, closeModalAction: () => void, onSuccessAction: (product: ProductWithRelations) => void) => {
  const t = useTranslations("add-product.create-form")
  const tErrors = useTranslations("add-product.create-form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const { upload } = useUpload()

  const form = useForm<ProductCreateFormValues>({
    resolver: zodResolver(productCreateFormSchema(tErrors)),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      parishId,
      translations: {
        ru: {
          locale: "ru",
          title: "",
          specification: "",
        },
        en: {
          locale: "en",
          title: "",
          specification: "",
        },
      },
      serialNumber: undefined,
      isNew: true,
      status: ProductStatus.FREE,
      categoryId: "",
    },
  })

  useSyncFormWithStorage(form, parishId)

  const onReset = useCallback(() => {
    form.reset(undefined, { keepDefaultValues: true });
    sessionStorage.removeItem(ADD_PRODUCT_FORM_DATA);
  }, [form]);

  const onSubmit = useCallback(
    (values: ProductCreateFormValues) => {
      startSubmitTransition(async () => {
        try {
          let photoUrl: string | undefined = undefined

          // Upload image if it's a File object
          if (values.photo instanceof File) {
            const uploadData = await upload(values.photo)
            photoUrl = formatResponsiveImage(uploadData)
          } else if (typeof values.photo === 'string') {
            photoUrl = values.photo
          }

          // Transform form data to DTO
          const productData: ProductCreateInput = {
            userId: "",
            serialNumber: values.serialNumber,
            order: values.order,
            status: values.status,
            isNew: values.isNew,
            photo: photoUrl ?? null,
            parishId: values.parishId,
            categoryId: values.categoryId,
            translations: [
              values.translations.ru,
              values.translations.en,
            ],
            prices: [
              ...(values.priceUAH ? [{ value: values.priceUAH, symbol: 'UAH' as const }] : []),
              ...(values.priceUSD ? [{ value: values.priceUSD, symbol: 'USD' as const }] : []),
            ],
          }

          const response = await requestСreateProduct({ data: productData })
          onSuccessAction(response)

          // Notify other components about new product
          emitProductAdded({ parishId })

          toast.success(t("toast.create-product-success"))
          form.reset()
          closeModalAction()

          setTimeout(() => {
            sessionStorage.removeItem(ADD_PRODUCT_FORM_DATA)
          }, 100)
        } catch (error) {
          if (error instanceof AlreadyExistsError) {
            form.setError('translations.ru.title', {
              type: 'manual',
              message: tErrors('err-title-exists')
            }, { shouldFocus: true });
            form.setError('translations.en.title', {
              type: 'manual',
              message: tErrors('err-title-exists')
            }, { shouldFocus: true });
            toast.error(t('toast.title-already-exists'));
          } else {
            console.error(error)
            toast.error(t("toast.create-product-error"))
          }
        }
      })
    },
    [upload, closeModalAction, t, form]
  )

  return {
    form,
    isSubmitting,
    onReset,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
