"use client"

import { useHydratedIsAdmin } from "@/features/auth/model/hooks/use-hydrated-user"
import { AddCategoryButtonDynamic } from "./bricks/add-category-button-dynamic"

interface AddCategoryButtonProps {
  className?: string
}

export const AddCategoryButton = ({ className }: AddCategoryButtonProps) => {
  const isAdmin = useHydratedIsAdmin()
  if (!isAdmin) return null;

  return <AddCategoryButtonDynamic className={className} />
}

AddCategoryButton.displayName = "AddCategoryButton"