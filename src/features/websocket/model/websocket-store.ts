import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface WebSocketState {
  isConnected: boolean;
  connectionError: string | null;

  setConnected: (connected: boolean) => void;
  setError: (error: string | null) => void;
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
    }),
    { name: 'websocket-store', enabled: process.env.NODE_ENV === 'development' }
  )
);