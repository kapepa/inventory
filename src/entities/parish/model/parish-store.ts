import { create } from 'zustand';
import { ParishWithRelations } from './types';

interface ParishesState {
  parishes: ParishWithRelations[];
  page: number;
  hasMore: boolean;
  setParishes: (parishes: ParishWithRelations[]) => void;
  appendParishes: (newParishes: ParishWithRelations[]) => void;
  addParish: (parish: ParishWithRelations) => void;
  removeParish: (id: string) => void;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
}

export const useParishesStore = create<ParishesState>((set) => ({
  parishes: [],
  page: 1,
  hasMore: true,
  setParishes: (parishes) => set({ parishes }),
  appendParishes: (newParishes) => set((state) => ({ 
    parishes: [...state.parishes, ...newParishes] 
  })),
  addParish: (parish) => set((state) => ({ 
    parishes: [parish, ...state.parishes] 
  })),
  removeParish: (id) => set((state) => ({ 
    parishes: state.parishes.filter((p) => p.id !== id) 
  })),
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
}));
