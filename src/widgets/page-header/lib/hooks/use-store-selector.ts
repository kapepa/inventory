import { StoreType } from "../types/types";
import { ParishesState } from "@/entities/parish/model/types/types";
import { CategoriesState } from "@/entities/category/model/types/types";
import { ProductsState } from "@/entities/product/model/types/types";
import { UsersState } from "@/entities/user/model/types/types";

export const useTotalByStore = (storeType?: StoreType) => {
  switch (storeType) {
    case 'parishes':
      const { useParishesStore } = require('@/entities/parish/model/parish-store');
      return useParishesStore((state: ParishesState) => state.total);
    case 'products':
      const { useProductsStore } = require('@/entities/product/model/products-store');
      return useProductsStore((state: ProductsState) => state.total);
    case 'categories':
      const { useCategoriesStore } = require('@/entities/category/model/categories-store');
      return useCategoriesStore((state: CategoriesState) => state.total);
    case 'users':
      const { useUsersStore } = require('@/entities/user/model/users-store');
      return useUsersStore((state: UsersState) => state.total);
    default:
      return null;
  }
};