import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CategoriesState {
  total: number;
  page: number;
  setPage: (page: number) => void;
  setTotal: (total: number) => void;
  setFull: (props: { total: number; page: number }) => void;
}

export const useCategoriesStore = create<CategoriesState>()(
  devtools(
    (set) => ({
      total: 0,
      page: 0,
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