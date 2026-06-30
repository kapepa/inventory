import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CategoryWithTranslations } from './types';

interface CategoriesState {
  total: number;
  page: number;
  newCategory: CategoryWithTranslations | null;
  addNewCategory: (category: CategoryWithTranslations | null) => void;
  setPage: (page: number) => void;
  setTotal: (total: number) => void;
  setFull: (props: { total: number; page: number }) => void;
}

export const useCategoriesStore = create<CategoriesState>()(
  devtools(
    (set) => ({
      total: 0,
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