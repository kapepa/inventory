"use client"

import { useTranslations } from "next-intl";
import { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { loginFormSchema, LoginFormValues, } from "../schemas-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../auth-store";
import { requestAuthLogin } from "../../api";
import { useVerifiedEmail } from "./use-verified-email";
import { InvalidCredentialsError, NotFoundError, NotVerifiedError } from "@/shared/lib/errors";
import { ROUTES } from "@/shared/constants/routes";
import { useUnmountCallback } from "@/shared/lib/hooks/use-unmount-callback";
import { AppLocale } from "@/shared/lib/i18n/config";
import { useRouter } from "next/navigation";

interface UseLoginFormProps {
  locale: AppLocale;
}

export const useLoginForm = ({ locale }: UseLoginFormProps) => {
  const router = useRouter()
  const tToast = useTranslations("auth.form.toast")
  const tErrors = useTranslations("auth.form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const { setCallback } = useUnmountCallback()
  const { confirmVerifiedEmail } = useVerifiedEmail()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema(tErrors)),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onReset = useCallback(() => {
    form.reset(undefined, { keepDefaultValues: true });
  }, [form]);

  const onSubmit = useCallback((values: LoginFormValues) => {
    startSubmitTransition(async () => {
      try {
        const user = await requestAuthLogin({ data: values })
        useAuthStore.setState({ user })
        router.push(`/${locale}/${ROUTES.PARISHES}`)
        setCallback(() => {
          toast.success(tToast("auth-login-success"))
        })
      } catch (error) {
        if (error instanceof InvalidCredentialsError || error instanceof NotFoundError) {
          form.setError('email', {
            type: 'manual',
            message: tErrors('email-invalid-credentials')
          }, { shouldFocus: true });
          form.setError('password', {
            type: 'manual',
            message: tErrors('passwords-invalid-credentials')
          });
          toast.error(tToast('auth-invalid-credentials'));
        } else if (error instanceof NotVerifiedError) {
          confirmVerifiedEmail(values.email)
          toast.error(tToast('auth-email-not-verified'));
        } else {
          console.error(error)
          toast.error(tToast("auth-login-error"))
        }
      }
    })
  }, [locale, router, toast, tErrors, requestAuthLogin, confirmVerifiedEmail])

  return {
    form,
    isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
    onReset,
  }
}