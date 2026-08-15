import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CategoryWithTranslations } from './types';
import { CategoriesState } from './types/types';

export const useCategoriesStore = create<CategoriesState>()(
  devtools(
    (set) => ({
      total: null,
      page: 0,
      newCategory: null,
      addNewCategory: (newCategory: CategoryWithTranslations | null) => set({ newCategory }, false, 'addNewCategory'),
      setPage: (page) => set({ page }, false, 'setPage'),
      setTotal: (total) => set({ total }, false, 'setTotal'),
      setFull: (props) => set({ ...props }, false, 'setFull'),
    }),
    {
      name: 'categories-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);