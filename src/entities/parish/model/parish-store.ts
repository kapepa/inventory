import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ParishesType } from './types';

interface ParishesState {
  total: number;
  page: number;
  activeParishe: ParishesType | null;
  newParishe: ParishesType | null;
  addNewParish: (parishe: ParishesType | null) => void;
  setActiveParishe: (parishe: ParishesType | null) => void;
  setTotal: (total: number) => void;
  setPage: (page: number) => void;
}

export const useParishesStore = create<ParishesState>()(
  devtools(
    (set) => ({
      total: 0,
      page: 1,
      activeParishe: null,
      newParishe: null,
      setPage: (page) => set({ page }),
      setTotal: (total) => set({ total }),
      addNewParish: (parishe) => set({ newParishe: parishe }),
      setActiveParishe: (parishe) => set({ activeParishe: parishe }),
    }),
    {
      name: 'products-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);
