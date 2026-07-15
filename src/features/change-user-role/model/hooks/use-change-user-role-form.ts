"use client"

import { useTranslations } from "next-intl";
import { useCallback, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestChangeUserRole } from "../../api";
import { changeUserRoleFormSchema, ChangeUserRoleFormValues } from "../schemas";


interface UseChangeUserRoleFormProps {
  userId: string;
  currentRole: 'USER' | 'ADMIN';
  onSuccess?: () => void;
}

export const useChangeUserRoleForm = ({ userId, currentRole }: UseChangeUserRoleFormProps) => {
  const tToast = useTranslations("change-user-role.toast")
  const tErrors = useTranslations("change-user-role.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()

  const form = useForm<ChangeUserRoleFormValues>({
    resolver: zodResolver(changeUserRoleFormSchema(tErrors)),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      userId,
      role: currentRole,
    },
  })

  const onReset = useCallback(() => {
    form.reset({ userId, role: currentRole });
  }, [form, userId, currentRole]);

  const onSubmit = useCallback(
    (values: ChangeUserRoleFormValues) => {
      startSubmitTransition(async () => {
        try {
          await requestChangeUserRole({
            data: {
              userId: values.userId,
              role: values.role,
            }
          })

          toast.success(tToast("role-changed-success"))
        } catch (error) {
          // if (error instanceof UserNotFoundError) {
          //   toast.error(tToast('user-not-found'));
          // }
          // else if (error instanceof InsufficientPermissionsError) {
          //   toast.error(tToast('insufficient-permissions'));
          // }
          // else if (error instanceof SameRoleError) {
          //   form.setError('role', {
          //     type: 'manual',
          //     message: tErrors('same-role')
          //   });
          //   toast.error(tToast('same-role'));
          // }
          // else {
          //   toast.error(tToast('unknown-error'));
          // }
          console.log(error)
        }
      })
    },
    [tToast, tErrors, form]
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