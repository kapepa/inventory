import { io, Socket } from 'socket.io-client';

class SocketClient {
  private socket: Socket | null = null;

  connect(url: string, token?: string): Socket {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(url, {
      auth: token ? { token } : undefined,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
      transports: ['websocket', 'polling'],
    });

    this.setupListeners();
    return this.socket;
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('[WS] Connected:', this.socket?.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('[WS] Disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('[WS] Error:', error.message);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data?: unknown) {
    if (this.socket?.connected) this.socket.emit(event, data);
  }

  on(event: string, callback: (...args: any[]) => void) {
    const wrappedCallback = (...args: any[]) => {
      callback(...args);
    };

    this.socket?.on(event, wrappedCallback);
  }

  off(event: string, callback?: (...args: any[]) => void) {
    this.socket?.off(event, callback);
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketClient = new SocketClient();