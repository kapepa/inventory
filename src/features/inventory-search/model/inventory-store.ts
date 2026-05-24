import { create } from 'zustand';

interface SearchState {
  query: string;
  results: any[];// add here Interface
  isLoading: boolean;
  setQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
}

export const useInventoryStore = create<SearchState>((set) => ({
  query: '',
  results: [],
  isLoading: false,

  setQuery: (query) => set({ query }),

  search: async (query) => {
    if (!query.trim()) {
      set({ results: [], isLoading: false });
      return;
    }

    // add abortcontroller
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const results = await response.json();
      set({ results, isLoading: false });
    } catch (error) {
      console.error('Search error:', error);
      set({ isLoading: false });
    }
  },
}));