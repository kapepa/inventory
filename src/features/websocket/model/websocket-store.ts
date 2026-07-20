import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface WebSocketState {
  isConnected: boolean;
  connectionError: string | null;
  onlineUsers: string[];

  setConnected: (connected: boolean) => void;
  setError: (error: string | null) => void;
  addOnlineUser: (userId: string) => void;
  removeOnlineUser: (userId: string) => void;
}

export const useWebSocketStore = create<WebSocketState>()(
  devtools(
    (set) => ({
      isConnected: false,
      connectionError: null,
      onlineUsers: [],

      setConnected: (isConnected) =>
        set({ isConnected, connectionError: null }, false, 'setConnected'),

      setError: (connectionError) =>
        set({ connectionError }, false, 'setError'),

      addOnlineUser: (userId) =>
        set((state) => ({
          onlineUsers: state.onlineUsers.includes(userId)
            ? state.onlineUsers
            : [...state.onlineUsers, userId],
        }), false, 'addOnlineUser'),

      removeOnlineUser: (userId) =>
        set((state) => ({
          onlineUsers: state.onlineUsers.filter((id) => id !== userId),
        }), false, 'removeOnlineUser'),
    }),
    { name: 'websocket-store', enabled: process.env.NODE_ENV === 'development' }
  )
);