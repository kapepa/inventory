import { AppLocale } from "@/shared/lib/i18n/config";
import { getTranslations } from "next-intl/server";
import { AddCategoryButtonContent } from "./bricks/add-category-button-content";

interface AddCategoryButtonProps {
  locale: AppLocale
  className?: string
}

export const AddCategoryButton = async ({ locale, className }: AddCategoryButtonProps) => {
  const t = await getTranslations({ locale, namespace: "add-category" });

  return <AddCategoryButtonContent label={t("buttons.create")} className={className} />
}

AddCategoryButton.displayName = "AddCategoryButton"