import { useParishesStore, useProductsStore } from "@/entities";
import { StoreType } from "../types";

export const useTotalByStore = (storeType?: StoreType) => {
  const parishesTotal = useParishesStore((state) => state.total);
  const productsTotal = useProductsStore((state) => state.total);

  switch (storeType) {
    case 'parishes':
      return parishesTotal;
    case 'products':
      return productsTotal;
    default:
      return null;
  }
};