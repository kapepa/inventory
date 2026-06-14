import { FetchParishes } from "./types";

export interface FetchParishesParams extends FetchParishes {
  signal?: AbortSignal,
}
