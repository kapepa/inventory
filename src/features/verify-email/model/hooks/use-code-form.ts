"use client"

import { useTranslations } from "next-intl";
import { useCallback, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { codeFormSchema, CodeFormValues } from "../schemas-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestVerifyCodeEmail } from "../../api";
import { ERROR_CODES, NotFoundError, ROUTES, useRouter, useUnmountCallback } from "@/shared";

interface UseCodeFormProps {
  email: string,
  token: string,
}

export const useCodeForm = ({ email, token }: UseCodeFormProps) => {
  const router = useRouter()
  const tToast = useTranslations("verify-email.use-code-form.toast")
  const tErrors = useTranslations("verify-email.use-code-form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const { setCallback } = useUnmountCallback()

  const form = useForm<CodeFormValues>({
    resolver: zodResolver(codeFormSchema(tErrors)),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email,
      token,
      code: ""
    },
  })

  const onReset = useCallback(() => {
    form.reset(undefined, { keepDefaultValues: true });
  }, [form]);

  const onSubmit = useCallback(
    (values: CodeFormValues) => {
      startSubmitTransition(async () => {
        try {
          await requestVerifyCodeEmail({ data: values })
          router.push(ROUTES.AUTH)
          setCallback(() => {
            toast.success(tToast("verify-code-success"))
          })
        } catch (error) {
          if (error instanceof NotFoundError) {
            form.setError('code', {
              type: 'manual',
              message: tErrors('code-invalid')
            }, { shouldFocus: true });
            toast.error(tToast('verify-code-invalid'));
          } else {
            console.error(error)
            toast.error(tToast("verify-code-error"))
          }
        }
      })
    },
    [tToast, form]
  )

  const handleSubmit = useMemo(() => form.handleSubmit(onSubmit), [form, onSubmit])

  return useMemo(
    () => ({
      form,
      isSubmitting,
      onSubmit: handleSubmit,
      onReset,
    }),
    [form, isSubmitting, handleSubmit, onReset]
  )
}