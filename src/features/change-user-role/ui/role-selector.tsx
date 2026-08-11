"use client";

import { Info } from 'lucide-react';
import { CancelButton, SubmitButton } from "@/shared/ui/action-buttons";
import { cn } from "@/shared/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { AuthenticatedUser } from "@/features/auth/model/types";
import { useChangeUserRoleForm } from "../model/hooks/use-change-user-role-form";
import { RoleSelectorLabels } from '../model/types/types';

interface RoleSelectorProps {
  user: AuthenticatedUser
  labels: RoleSelectorLabels;
  className?: string;
}

export const RoleSelector = ({
  user,
  labels,
  className,
}: RoleSelectorProps) => {
  const { form, onSubmit, isSubmitting, onReset } = useChangeUserRoleForm({ userId: user.id, currentRole: user.role })

  return (
    <div
      className={cn("bg-background rounded-sm overflow-hidden", className)}
    >
      <h3 className="text-center my-5 px-6 font-semibold text-muted-foreground">
        {labels.title} {user.name}
      </h3>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col gap-y-6 pb-3 px-6">
            <FormField
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {labels.roleLabel}
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="text-accent" size={18} strokeWidth={2} />
                      </TooltipTrigger>
                      <TooltipContent>
                        {labels.infoText}
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={labels.selectPlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">
                        {labels.roleUser}
                      </SelectItem>
                      <SelectItem value="ADMIN">
                        {labels.roleAdmin}
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
              {labels.resetButton}
            </CancelButton>
            <SubmitButton
              type="submit"
              variant="simply-accent"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {labels.changeRoleButton}
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

RoleSelector.displayName = "RoleSelector"