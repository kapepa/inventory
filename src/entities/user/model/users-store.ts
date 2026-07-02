import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UsersState {
  total: number;
  page: number;
  setPage: (page: number) => void;
  setTotal: (total: number) => void;
  setFull: (props: { total: number; page: number }) => void;
}

export const useUsersStore = create<UsersState>()(
  devtools(
    (set) => ({
      total: 0,
      page: 0,
      setPage: (page) => set({ page }, false, 'setPage'),
      setTotal: (total) => set({ total }, false, 'setTotal'),
      setFull: (props) => set({ ...props }, false, 'setFull'),
    }),
    {
      name: 'users-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);