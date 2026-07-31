"use client";

import { CancelButton, Input, SubmitButton } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { VALIDATION_LIMITS } from "@/shared/constants";
import { cn } from "@/shared/lib";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { useChangePasswordForm } from "../model/hooks/use-change-password-form";

interface ChangePasswordFormProps {
  className?: string
}

export const ChangePasswordForm = memo(({ className }: ChangePasswordFormProps) => {
  const t = useTranslations("change-password")
  const { form, onSubmit, isSubmitting, onReset } = useChangePasswordForm()

  return (
    <div
      className={cn("bg-background rounded-sm overflow-hidden", className)}
    >
      <h3 className="text-center my-5 px-6 font-semibold text-muted-foreground">{t("title")}</h3>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col gap-y-6 pb-3 px-6">
            <FormField
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('labels.current-password')}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t('placeholders.current-password')}
                      {...field}
                      value={field.value ?? ''}
                      maxLength={VALIDATION_LIMITS.PASSWORD_MAX_LENGTH + 1}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <div className="h-1 mt-0">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('labels.new-password')}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t('placeholders.new-password')}
                      {...field}
                      value={field.value ?? ''}
                      maxLength={VALIDATION_LIMITS.PASSWORD_MAX_LENGTH + 1}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <div className="h-1 mt-0">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('labels.confirm-password')}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t('placeholders.confirm-password')}
                      {...field}
                      value={field.value ?? ''}
                      maxLength={VALIDATION_LIMITS.PASSWORD_MAX_LENGTH + 1}
                      disabled={isSubmitting}
                    />
                  </FormControl>
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
              {t("buttons.change-password")}
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
});

ChangePasswordForm.displayName = "ChangePasswordForm"