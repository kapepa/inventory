import { Parish, ParishTranslation } from "@prisma/client";

export interface CreateParishInput extends Pick<Parish, "deliveryDate"> {
  translations: Pick<ParishTranslation, "locale" | "title" | "description">[]
}
