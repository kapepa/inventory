'use client';

import { useOnlineUserstStore, useWebSocket, useAuthStore } from '@/features';
import { SOCKET_EVENTS, UserStatusData } from '@/shared';
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
  const { addOnlineUser, setOnlineUsers, removeOnlineUser } = useOnlineUserstStore()
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
      (userIds: string[]) => {
        setOnlineUsers(userIds)
      }
    );

    return unsubscribe;
  }, [isConnected, subscribe]);

  // Follow other users' updates
  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = subscribe<UserStatusData>(
      SOCKET_EVENTS.USER.STATUS,
      ({ userId, status }: UserStatusData) => {
        if (status === "online") addOnlineUser(userId)
        if (status === "offline") removeOnlineUser(userId)
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