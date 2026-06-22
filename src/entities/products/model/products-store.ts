import { create } from 'zustand';

interface ProductsState {
  total: number;
  page: number;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
  setPage: (page: number) => void;
  setTotal: (total: number) => void;
  setFull: (props: { total: number, page: number, hasMore: boolean }) => void
}

export const useProductsStore = create<ProductsState>((set) => ({
  total: 0,
  page: 1,
  hasMore: true,
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
  setTotal: (total) => set({ total }),
  setFull: (props) => set({ ...props })
}));