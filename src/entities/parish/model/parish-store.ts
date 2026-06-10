import { create } from 'zustand';
import { ParishWithRelations } from './types/types';

interface ParishesState {
  parishes: ParishWithRelations[];
  page: number;
  hasMore: boolean;
  total: number;
  setParishes: (parishes: ParishWithRelations[]) => void;
  appendParishes: (newParishes: ParishWithRelations[]) => void;
  addParish: (parish: ParishWithRelations) => void;
  removeParish: (id: string) => void;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setTotal: (total: number) => void;
}

export const useParishesStore = create<ParishesState>((set) => ({
  parishes: [],
  page: 1,
  hasMore: true,
  total: 0,
  setParishes: (parishes) => set({ parishes }),
  appendParishes: (newParishes) => set((state) => ({
    parishes: [...state.parishes, ...newParishes]
  })),
  addParish: (parish) => set((state) => ({
    parishes: [parish, ...state.parishes],
    total: state.total + 1
  })),
  removeParish: (id) => set((state) => ({
    parishes: state.parishes.filter((p) => p.id !== id),
    total: state.total - 1
  })),
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
  setTotal: (total) => set({ total }),
}));
