import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ParishesState } from './types/types';

export const useParishesStore = create<ParishesState>()(
  devtools(
    (set) => ({
      total: null,
      page: 1,
      activeParishe: null,
      newParishe: null,
      setPage: (page) => set({ page }),
      setTotal: (total) => set({ total }),
      addNewParish: (parishe) => set({ newParishe: parishe }),
    }),
    {
      name: 'products-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);
