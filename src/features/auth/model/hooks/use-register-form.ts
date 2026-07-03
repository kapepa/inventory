import { useTranslations } from "next-intl";
import { useCallback, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { registerFormSchema, RegisterFormValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../auth-store";

export const useRegisterForm = () => {
  const tToast = useTranslations("auth.toast")
  const tErrors = useTranslations("auth.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const { setUser } = useAuthStore();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema(tErrors)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = useCallback(
    (values: RegisterFormValues) => {
      startSubmitTransition(async () => {
        try {
          console.log(values)

          toast.success(tToast("auth-register-success"))
          form.reset()
        } catch (error) {
          console.error(error)
          toast.error(tToast("auth-register--error"))
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