import { ParishesType, ParishWithRelationsTotals } from "./types";

export function isTotalsParish(parish: ParishesType): parish is ParishWithRelationsTotals {
  return 'totals' in parish;
}