import { Category, Parish, Product, User } from "@prisma/client";

export interface DeleteParishResult extends Parish { }
export interface DeleteProductResult extends Product { }
export interface DeleteCategoryResult extends Category { }
export interface DeleteAccountResult extends User { }

export interface DeleteAccountLabels {
  description: string;
  deleteButton: string;
}