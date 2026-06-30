import { Category, Parish, Product } from "@prisma/client";

export interface DeleteParishResult extends Parish { }
export interface DeleteProductResult extends Product { }
export interface DeleteCategoryResult extends Category { }