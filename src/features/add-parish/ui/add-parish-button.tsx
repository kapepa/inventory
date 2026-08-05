"use client"

import { memo } from "react"
import { useHydratedIsAdmin } from "@/features/auth/model/hooks/use-hydrated-user"
import { AddParishButtonDynamic } from "./bricks/add-parish-button-dynamic"

interface AddParishButtonProps {
  className?: string
}

export const AddParishButton = memo(({ className }: AddParishButtonProps) => {
  const isAdmin = useHydratedIsAdmin()
  if (!isAdmin) return null;

  return <AddParishButtonDynamic className={className} />;
})

AddParishButton.displayName = "AddParishButton"