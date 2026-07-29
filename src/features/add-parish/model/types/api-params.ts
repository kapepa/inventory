import { ParishFormValues } from "../schemas-client";

export interface CreateParishParams {
  data: ParishFormValues
  signal?: AbortSignal,
}