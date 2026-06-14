import { Parish, ParishTranslation } from "@prisma/client";
import { ParishWithRelations } from "@/entities";

export type { ParishWithRelations };

export interface CreateParishInput extends Pick<Parish, "deliveryDate"> {
  translations: Pick<ParishTranslation, "locale" | "title" | "description">[]
}
