export enum SocketEvent {
  // Connection
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CONNECT_ERROR = 'connect_error',

  // Users
  USER_STATUS = 'user:status',
  USER_ONLINE = 'user:online',
  USER_OFFLINE = 'user:offline',
  ONLINE_USERS_LIST = 'online-users:list',
}

export interface UserStatusData {
  userId: string;
  status: 'online' | 'offline';
}