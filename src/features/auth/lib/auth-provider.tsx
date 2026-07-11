'use client';

import { createContext, useRef } from 'react';
import { AuthenticatedUser, useAuthStore } from '@/features';

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: AuthenticatedUser | null;
}

export const InitialUserContext = createContext<AuthenticatedUser | null>(null);

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const initialized = useRef(false);

  if (!initialized.current) {
    queueMicrotask(() => {
      useAuthStore.setState({
        user: initialUser,
        isLoading: false,
        isAuthenticated: !!initialUser
      });
    });
    initialized.current = true;
  }

  return (
    <InitialUserContext.Provider value={initialUser}>
      {children}
    </InitialUserContext.Provider>
  );
}