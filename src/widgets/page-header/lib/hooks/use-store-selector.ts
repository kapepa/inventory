import { useCategoriesStore, useParishesStore, useProductsStore, useUsersStore } from "@/entities";
import { StoreType } from "../types";

export const useTotalByStore = (storeType?: StoreType) => {
  const parishesTotal = useParishesStore((state) => state.total);
  const productsTotal = useProductsStore((state) => state.total);
  const categoriesTotal = useCategoriesStore((state) => state.total)
  const usersTotal = useUsersStore((state) => state.total);

  switch (storeType) {
    case 'parishes':
      return parishesTotal;
    case 'products':
      return productsTotal;
    case 'categories':
      return categoriesTotal;
    case 'users':
      return usersTotal;
    default:
      return null;
  }
};