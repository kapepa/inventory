import { AppLocale } from "@/shared/lib/i18n/config";
import { AddCategoryButtonContent } from "./bricks/add-category-button-content";
import { getTranslations } from "next-intl/server";

interface AddCategoryButtonProps {
  locale: AppLocale
  className?: string
}

export const AddCategoryButton = async ({ locale, className }: AddCategoryButtonProps) => {
  const t = await getTranslations({ locale, namespace: "add-category" });

  return <AddCategoryButtonContent label={t("buttons.create")} className={className} />
}

AddCategoryButton.displayName = "AddCategoryButton"