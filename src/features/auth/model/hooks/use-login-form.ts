import { useTranslations } from "next-intl";
import { useCallback, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { loginFormSchema, LoginFormValues, } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../auth-store";

export const useLoginForm = () => {
  const tToast = useTranslations("auth.toast")
  const tErrors = useTranslations("auth.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const { setUser } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema(tErrors)),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = useCallback(
    (values: LoginFormValues) => {
      startSubmitTransition(async () => {
        try {
          console.log(values)

          toast.success(tToast("auth-login-success"))
          form.reset()
        } catch (error) {
          console.error(error)
          toast.error(tToast("auth-login-error"))
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
    }),
    [form, isSubmitting, handleSubmit]
  )
}