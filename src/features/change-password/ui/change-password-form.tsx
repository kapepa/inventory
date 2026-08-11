"use client";

import { Input } from "@/shared/ui/input";
import { CancelButton, SubmitButton } from "@/shared/ui/action-buttons";
import { VALIDATION_LIMITS } from "@/shared/constants/validation";
import { cn } from "@/shared/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { useChangePasswordForm } from "../model/hooks/use-change-password-form";
import { ChangePasswordFormLabels } from "../model/types/types";

interface ChangePasswordFormProps {
  labels: ChangePasswordFormLabels;
  className?: string;
}

export const ChangePasswordForm = ({ labels, className }: ChangePasswordFormProps) => {
  const { form, onSubmit, isSubmitting, onReset } = useChangePasswordForm()

  return (
    <div
      className={cn("bg-background rounded-sm overflow-hidden", className)}
    >
      <h3 className="text-center my-5 px-6 font-semibold text-muted-foreground">{labels.title}</h3>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col gap-y-6 pb-3 px-6">
            <FormField
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labels.currentPasswordLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={labels.currentPasswordPlaceholder}
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
                  <FormLabel>{labels.newPasswordLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={labels.newPasswordPlaceholder}
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
                  <FormLabel>{labels.confirmPasswordLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={labels.confirmPasswordPlaceholder}
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
              {labels.resetButton}
            </CancelButton>
            <SubmitButton
              type="submit"
              variant="simply-accent"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {labels.changePasswordButton}
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

ChangePasswordForm.displayName = "ChangePasswordForm"