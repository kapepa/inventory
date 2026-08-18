import { AppLocale } from "@/shared/lib/i18n/config";
import { CategoryFormValues } from "../schemas-client";

export interface CategoryMutationContext {
  input: CategoryFormValues
  locale: AppLocale
}