import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ProductsState } from './types/types';

export const useProductsStore = create<ProductsState>()(
  devtools(
    (set) => ({
      total: 0,
      page: 0,
      setPage: (page) => set({ page }, false, 'setPage'),
      setTotal: (total) => set({ total }, false, 'setTotal'),
      setFull: (props) => set({ ...props }, false, 'setFull'),
    }),
    {
      name: 'products-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);