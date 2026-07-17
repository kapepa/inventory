"use client";

import { CancelButton, cn, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, SubmitButton, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared";
import { useChangeUserRoleForm } from "../model/hooks";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { AuthenticatedUser } from "@/features/auth";

interface RoleSelectorProps {
  className?: string;
  user: AuthenticatedUser
}

export const RoleSelector = memo(({
  className,
  user
}: RoleSelectorProps) => {
  const t = useTranslations("change-user-role")
  const { form, onSubmit, isSubmitting, onReset } = useChangeUserRoleForm({ userId: user.id, currentRole: user.role })

  return (
    <div
      className={cn("bg-background rounded-sm overflow-hidden", className)}
    >
      <h5 className="text-center my-5 px-6 font-semibold text-muted-foreground">
        {t("title")} {user.name}
      </h5>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col gap-y-6 pb-3 px-6">
            <FormField
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('labels.role')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('placeholders.select-role')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">
                        {t('roles.user')}
                      </SelectItem>
                      <SelectItem value="ADMIN">
                        {t('roles.admin')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="h-1 mt-0">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="bg-accent px-6 py-3 flex justify-end gap-x-2">
            <CancelButton
              type="button"
              onClick={onReset}
              disabled={isSubmitting}
            >
              {t("buttons.reset")}
            </CancelButton>
            <SubmitButton
              type="submit"
              variant="simply-accent"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {t("buttons.change-role")}
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
});

RoleSelector.displayName = "RoleSelector"