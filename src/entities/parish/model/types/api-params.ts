import { ParishFormValues } from "@/features";
import { FetchParishes } from "./types";

export interface FetchParishesParams extends FetchParishes {
  signal?: AbortSignal,
}

export interface CreateParishParams {
  data: ParishFormValues
  signal?: AbortSignal,
}

export interface DeleteParishesParams {
  id: string,
  signal?: AbortSignal,
}
