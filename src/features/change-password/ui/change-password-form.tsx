"use client"

import { AuthenticatedUser } from "@/features/auth"

interface ChangePasswordFormProps {
  user: AuthenticatedUser
}

export const ChangePasswordForm = ({ user }: ChangePasswordFormProps) => {
  return (
    <div>
      ChangePasswordForm
    </div>
  )
}

ChangePasswordForm.displayName = "ChangePasswordForm"