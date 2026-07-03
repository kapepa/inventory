import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { MiddlewareUser } from "./types";

interface AuthState {
  user: MiddlewareUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: MiddlewareUser | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,
      setUser: (user) => set(
        { user, isLoading: false, isAuthenticated: !!user },
        false,
        'setUser'
      ),
      setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
      logout: () => set(
        { user: null, isLoading: false, isAuthenticated: false },
        false,
        'logout'
      ),
    }),
    {
      name: 'auth-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);