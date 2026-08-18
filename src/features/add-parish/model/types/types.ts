import { Parish, ParishTranslation } from "@prisma/client";
import { ParishFormValues } from "../schemas-client";
import { AppLocale } from "@/shared/lib/i18n/config";

export interface CreateParishInput extends Pick<Parish, "deliveryDate"> {
  translations: Pick<ParishTranslation, "locale" | "title" | "description">[]
}

export interface CreateParishContext {
  input: ParishFormValues,
  locale: AppLocale
}
