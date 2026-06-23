import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ProductsState {
  total: number;
  page: number;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
  setPage: (page: number) => void;
  setTotal: (total: number) => void;
  setFull: (props: { total: number; page: number; hasMore: boolean }) => void;
}

export const useProductsStore = create<ProductsState>()(
  devtools(
    (set) => ({
      total: 0,
      page: 1,
      hasMore: true,
      setPage: (page) => set({ page }, false, 'setPage'),
      setHasMore: (hasMore) => set({ hasMore }, false, 'setHasMore'),
      setTotal: (total) => set({ total }, false, 'setTotal'),
      setFull: (props) => set({ ...props }, false, 'setFull'),
    }),
    {
      name: 'products-store',
      enabled: process.env.NODE_ENV === 'development',
      serialize: {
        options: {
          undefined: true,
          function: false,
          symbol: false,
        }
      }
    }
  )
);