import { ParishFormValues } from "../schemas";

export interface CreateParishParams {
  data: ParishFormValues
  signal?: AbortSignal,
}