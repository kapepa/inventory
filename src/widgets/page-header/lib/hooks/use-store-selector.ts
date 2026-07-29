import { useCategoriesStore, useParishesStore, useProductsStore, useUsersStore } from "@/entities";
import { StoreType } from "../types";

export const useTotalByStore = (storeType?: StoreType) => {
  switch (storeType) {
    case 'parishes':
      return useParishesStore((state) => state.total);
    case 'products':
      return useProductsStore((state) => state.total);
    case 'categories':
      return useCategoriesStore((state) => state.total);
    case 'users':
      return useUsersStore((state) => state.total);
    default:
      return null;
  }
};