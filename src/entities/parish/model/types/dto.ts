import { ParishWithRelations, ParishWithRelationsTotals } from "./types";

export interface ResponseParishesTotalsDTO {
  data: ParishWithRelationsTotals[];
  total: number;
  hasMore: boolean;
}


export interface ResponseParishesDTO {
  data: ParishWithRelations[];
  total: number;
  hasMore: boolean;
}