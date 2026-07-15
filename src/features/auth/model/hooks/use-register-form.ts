"use client"

import { useTranslations } from "next-intl";
import { useCallback, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { registerFormSchema, RegisterFormValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestAuthRegister } from "../../api";
import { AlreadyExistsError, NotVerifiedError, useRouter, useUnmountCallback } from "@/shared";
import { useVerifiedEmail } from "./use-verified-email";

export const useRegisterForm = () => {
  const router = useRouter()
  const tToast = useTranslations("auth.form.toast")
  const tErrors = useTranslations("auth.form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const { setCallback } = useUnmountCallback()
  const { confirmVerifiedEmail } = useVerifiedEmail()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema(tErrors)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onReset = useCallback(() => {
    form.reset(undefined, { keepDefaultValues: true });
  }, [form]);

  const onSubmit = useCallback(
    (values: RegisterFormValues) => {
      startSubmitTransition(async () => {
        try {
          const verificationLink = await requestAuthRegister({ data: values })
          router.push(verificationLink)
          setCallback(() => {
            toast.success(tToast("auth-register-success"))
            onReset()
          })
        } catch (error) {
          if (error instanceof AlreadyExistsError) {
            form.setError('email', {
              type: 'manual',
              message: tErrors('email-already-exists')
            }, { shouldFocus: true });
            toast.error(tToast('auth-user-already_exists'));
          } else if (error instanceof NotVerifiedError) {
            confirmVerifiedEmail(values.email)
            toast.error(tToast('auth-email-not-verified'));
          } else {
            console.error(error)
            toast.error(tToast("auth-register-error"))
          }
        }
      })
    },
    [tToast, form, onReset]
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