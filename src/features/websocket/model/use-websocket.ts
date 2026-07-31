'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useWebSocketStore } from './websocket-store';
import { SocketEvent } from '@/shared/types';

interface UseWebSocketOptions {
  autoConnect?: boolean;
  userId?: string;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { autoConnect = true, userId } = options;
  const { isConnected, setConnected, setError } = useWebSocketStore();
  const hasInitialized = useRef(false);
  const socketClientRef = useRef<any>(null);

  useEffect(() => {
    if (!autoConnect || hasInitialized.current) return;
    hasInitialized.current = true;

    const initSocket = async () => {
      const { socketClient } = await import('@/shared/lib/websocket/socket-client-dynamic');
      socketClientRef.current = socketClient;

      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000';
      await socketClient.connect(wsUrl, userId);

      const handleConnect = () => {
        setConnected(true);
        setError(null);
      };

      const handleDisconnect = () => {
        setConnected(false);
      };

      const handleError = (error: Error) => {
        setError(error.message);
        setConnected(false);
      };

      socketClient.on(SocketEvent.CONNECT, handleConnect);
      socketClient.on(SocketEvent.DISCONNECT, handleDisconnect);
      socketClient.on('connect_error', handleError);

      if (socketClient.isConnected()) {
        handleConnect();
      }

      return () => {
        socketClient.off(SocketEvent.CONNECT, handleConnect);
        socketClient.off(SocketEvent.DISCONNECT, handleDisconnect);
        socketClient.off('connect_error', handleError);
      };
    };

    initSocket();
  }, [autoConnect, userId, setConnected, setError]);

  const subscribe = useCallback(
    <T = unknown>(event: SocketEvent | string, callback: (data: T) => void) => {
      if (!socketClientRef.current) return () => { };
      socketClientRef.current.on(event, callback);
      return () => socketClientRef.current?.off(event, callback);
    },
    []
  );

  const emit = useCallback((event: string, data?: unknown) => {
    if (!socketClientRef.current) return;
    socketClientRef.current.emit(event, data);
  }, []);


  return {
    isConnected,
    subscribe,
    emit,
  };
}