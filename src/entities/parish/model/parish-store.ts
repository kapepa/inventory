import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ParishWithRelations, ParishWithRelationsTotals } from './types';

type ParishesType = ParishWithRelations | ParishWithRelationsTotals

interface ParishesState {
  total: number;
  page: number;
  hasMore: boolean;
  activeParishe: ParishesType
  setActiveParishe: (parishe: ParishesType) => void
  setHasMore: (hasMore: boolean) => void;
  setPage: (page: number) => void;
  setTotal: (total: number) => void;
  setFull: (props: { total: number; page: number; hasMore: boolean }) => void;
}

export const useParishesStore = create<ParishesState>()(
  devtools(
    (set) => ({
      total: 0,
      page: 1,
      hasMore: true,
      setPage: (page) => set({ page }, false, 'setPage'),
      setHasMore: (hasMore) => set({ hasMore }, false, 'setHasMore'),
      setTotal: (total) => set({ total }, false, 'setTotal'),
      setFull: (props) => set({ ...props }, false, 'setFull'),
      setActiveParishe: (parishe) => set({ activeParishe: parishe })
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
