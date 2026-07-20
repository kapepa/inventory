'use client';

import { useEffect, useCallback, useRef } from 'react';
import { socketClient, SocketEvent } from '@/shared';
import { useWebSocketStore } from './websocket-store';

interface UseWebSocketOptions {
  autoConnect?: boolean;
  userId?: string;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { autoConnect = true, userId } = options;
  const { isConnected, setConnected, setError } = useWebSocketStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!autoConnect || hasInitialized.current) return;
    hasInitialized.current = true;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000';
    socketClient.connect(wsUrl, userId);

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
  }, [autoConnect, userId, setConnected, setError]);

  const subscribe = useCallback(
    <T = unknown>(event: SocketEvent | string, callback: (data: T) => void) => {
      socketClient.on(event, callback);
      return () => socketClient.off(event, callback);
    },
    []
  );

  const emit = useCallback((event: string, data?: unknown) => {
    socketClient.emit(event, data);
  }, []);


  return {
    isConnected,
    subscribe,
    emit,
  };
}