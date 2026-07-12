"use client"

import { AuthenticatedUser } from "@/features/auth"

interface RoleSelectorProps {
  user: AuthenticatedUser
}


export const RoleSelector = ({ user }: RoleSelectorProps) => {
  return (
    <div>
      RoleSelector
    </div>
  )
}

RoleSelector.displayName = "RoleSelector"