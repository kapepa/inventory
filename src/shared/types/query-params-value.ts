import { QUERY_PARAMS_KEYS } from "../constants";

export type QueryParamsValue = (typeof QUERY_PARAMS_KEYS)[keyof typeof QUERY_PARAMS_KEYS]