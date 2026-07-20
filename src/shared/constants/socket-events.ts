import { SocketEvent } from "../types/websocket";

export const SOCKET_EVENTS = {
  CONNECTION: {
    CONNECT: SocketEvent.CONNECT,
    DISCONNECT: SocketEvent.DISCONNECT,
  },
  USER: {
    STATUS: SocketEvent.USER_STATUS,
    ONLINE: SocketEvent.USER_ONLINE,
    OFFLINE: SocketEvent.USER_OFFLINE,
    ONLINE_USERS_LIST: SocketEvent.ONLINE_USERS_LIST
  },
} as const;

export const SOCKET_ROOMS = {
  user: (id: string) => `user:${id}`,
} as const;