"use client"

import { useTranslations } from "next-intl";
import { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form"
import { toast } from "@/shared/ui/sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestChangeUserRole } from "../../api";
import { changeUserRoleFormSchema, ChangeUserRoleFormValues } from "../schemas-client";
import { UserRoleType } from "../types";
import { ForbiddenError, InvalidInputError } from "@/shared/lib/errors";
import { useAuthStore } from "@/features/auth/model/auth-store";

interface UseChangeUserRoleFormProps {
  userId: string;
  currentRole: UserRoleType;
  onSuccess?: () => void;
}

export const useChangeUserRoleForm = ({ userId, currentRole }: UseChangeUserRoleFormProps) => {
  const tToast = useTranslations("change-user-role.toast")
  const tErrors = useTranslations("change-user-role.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()

  const form = useForm<ChangeUserRoleFormValues>({
    resolver: zodResolver(changeUserRoleFormSchema(tErrors)),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      userId,
      role: currentRole,
    },
  })

  const onReset = useCallback(() => {
    form.reset({ userId, role: currentRole }, { keepDefaultValues: true });
  }, [form, userId, currentRole]);

  const onSubmit = useCallback(
    (values: ChangeUserRoleFormValues) => {
      startSubmitTransition(async () => {
        // if (values.role === form.getValues("role")) {
        //   toast.error(tToast("role-not-changed"))
        //   return
        // }
        try {
          const role = await requestChangeUserRole({
            data: {
              userId: values.userId,
              role: values.role,
            }
          })

          useAuthStore.setState((state) => ({
            user: state.user ? { ...state.user, role } : null
          }));

          form.setValue("role", role)

          toast.success(tToast("role-changed-success"))
        } catch (error) {
          if (error instanceof ForbiddenError) {
            toast.error(tToast('insufficient-permissions'));
          }
          else if (error instanceof InvalidInputError) {
            form.setError('role', {
              type: 'manual',
              message: tErrors('same-role')
            });
            toast.error(tToast('same-role'));
          }
          else {
            toast.error(tToast('unknown-error'));
          }
          console.log(error)
        }
      })
    },
    [tToast, tErrors, form]
  )

  return {
    form,
    isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
    onReset,
  }
}