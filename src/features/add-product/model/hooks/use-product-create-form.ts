"use client"
import { useCallback, useMemo, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { STORAGE_KEYS } from "@/shared"
import { ProductCreateFormValues, productCreateFormSchema } from "../schemas"
import { ProductStatus } from "@prisma/client"
import { formatResponsiveImage, useUpload } from "@/entities"
import { useSyncFormWithStorage } from "./use-sync-form-with-storage"

const ADD_PRODUCT_FORM_DATA = STORAGE_KEYS.ADD_PRODUCT_FORM_DATA

export const useProductCreateForm = (parishId: string = "33333333-3333-3333-3333-333333333333", closeModalAction: () => void) => {
  const t = useTranslations("add-product.create-form")
  const tErrors = useTranslations("add-product.create-form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const { upload } = useUpload()

  const form = useForm<ProductCreateFormValues>({
    resolver: zodResolver(productCreateFormSchema(tErrors)),
    mode: "onChange",
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
    },
  })

  useSyncFormWithStorage(form, parishId)

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

          console.log("onSubmitonSubmitonSubmitonSubmitonSubmit", photoUrl)

          // // Transform form data to DTO
          // const productData = {
          //   serialNumber: values.serialNumber,
          //   order: values.order,
          //   status: values.status,
          //   isNew: values.isNew,
          //   photo: photoUrl,
          //   parishId: values.parishId,
          //   categoryId: values.categoryId,
          //   translations: [
          //     values.translations.ru,
          //     values.translations.en,
          //   ],
          //   prices: [
          //     ...(values.priceUAH ? [{ value: values.priceUAH, symbol: 'UAH' as const }] : []),
          //     ...(values.priceUSD ? [{ value: values.priceUSD, symbol: 'USD' as const }] : []),
          //   ],
          // }

          // const response = await fetch('/api/products', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(productData),
          // })

          // if (!response.ok) {
          //   const error = await response.json()
          //   throw new Error(error.error || 'Failed to create product')
          // }

          sessionStorage.removeItem(ADD_PRODUCT_FORM_DATA)
          toast.success(t("toast.create-product-success"))
          closeModalAction()
        } catch (error) {
          console.error(error)
          toast.error(t("toast.create-product-error"))
        }
      })
    },
    [startSubmitTransition, closeModalAction, t]
  )

  const handleSubmit = useMemo(
    () => form.handleSubmit(
      onSubmit,
      (errors) => {
        console.error('Form validation errors:', errors)
      }
    ),
    [form, onSubmit]
  )

  return useMemo(
    () => ({
      form,
      isSubmitting,
      onSubmit: handleSubmit,
    }),
    [form, isSubmitting, handleSubmit]
  )
}
