"use client"
import { useCallback, useMemo, useTransition, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { STORAGE_KEYS } from "@/shared"
import { ProductCreateFormValues, createProductCreateSchema } from "../schemas"
import { ProductStatus } from "@prisma/client"

const ADD_PRODUCT_FORM_DATA = STORAGE_KEYS.ADD_PRODUCT_FORM_DATA

export const useProductCreateForm = (parishId: string, closeModalAction: () => void) => {
  const t = useTranslations("add-product.create-form")
  const tErrors = useTranslations("add-product.create-form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()

  const productCreateSchema = useMemo(
    () => createProductCreateSchema(tErrors),
    [tErrors]
  )

  const form = useForm<ProductCreateFormValues>({
    resolver: zodResolver(productCreateSchema),
    mode: "onChange",
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

  // Restore data from sessionStorage on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem(ADD_PRODUCT_FORM_DATA);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset({
          ...parsedData,
          parishId, // Always use the current parishId
        });
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parishId]);

  // Save data to sessionStorage on change
  useEffect(() => {
    const subscription = form.watch((values) => {
      sessionStorage.setItem(ADD_PRODUCT_FORM_DATA, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = useCallback(
    (values: ProductCreateFormValues) => {
      startSubmitTransition(async () => {
        try {
          let photoUrl: string | undefined = undefined

          // Upload image if it's a File object
          if (values.photo instanceof File) {
            const formData = new FormData()
            formData.append('file', values.photo)

            const uploadResponse = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            })

            if (!uploadResponse.ok) {
              const error = await uploadResponse.json()
              throw new Error(error.error || 'Failed to upload image')
            }

            const uploadData = await uploadResponse.json()
            photoUrl = uploadData.url
          } else if (typeof values.photo === 'string') {
            photoUrl = values.photo
          }

          // Transform form data to DTO
          const productData = {
            serialNumber: values.serialNumber,
            order: values.order,
            status: values.status,
            isNew: values.isNew,
            photo: photoUrl,
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

          const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to create product')
          }

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
    () => form.handleSubmit(onSubmit),
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
