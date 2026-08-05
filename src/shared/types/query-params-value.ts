import { QUERY_PARAMS_KEYS } from "../constants/query-params-keys";

export type QueryParamsValue = (typeof QUERY_PARAMS_KEYS)[keyof typeof QUERY_PARAMS_KEYS]