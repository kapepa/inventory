'use client';

import { useWebSocket } from '@/features/websocket';
import { UserStatusData, SOCKET_EVENTS } from '@/shared';
import { useAuthStore } from '@/features/auth';
import { useEffect, createContext, useContext, ReactNode } from 'react';

interface WebSocketContextValue {
  isConnected: boolean;
  connectionError: string | null;
}

const WebSocketContext = createContext<WebSocketContextValue>({
  isConnected: false,
  connectionError: null,
});

export const useWebSocketContext = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const { user, isAuthenticated } = useAuthStore();
  const { isConnected, subscribe, emit } = useWebSocket({
    autoConnect: true,
    userId: user?.id,
  });

  // Notify the server that the user is online
  useEffect(() => {
    if (!isConnected || !isAuthenticated || !user) return;
    emit(SOCKET_EVENTS.USER.ONLINE, user.id);
  }, [isConnected, isAuthenticated, user, emit]);

  // Receive initial list of online users
  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = subscribe<string[]>(
      SOCKET_EVENTS.USER.ONLINE_USERS_LIST,
      (userIds) => {
        console.log('[WebSocket] Initial online users list:', userIds);
        // TODO: update global store with initial online users
      }
    );

    return unsubscribe;
  }, [isConnected, subscribe]);

  // Follow other users' updates
  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = subscribe<UserStatusData>(
      SOCKET_EVENTS.USER.STATUS,
      (data) => {
        console.log('[WebSocket] User status update:', data);
        // Here you can refresh the global store with the list of online users
      }
    );

    return unsubscribe;
  }, [isConnected, subscribe]);

  return (
    <WebSocketContext.Provider value={{ isConnected, connectionError: null }}>
      {children}
    </WebSocketContext.Provider>
  );
}