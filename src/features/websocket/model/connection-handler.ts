import { Server, Socket } from 'socket.io';
import { OnlineUsersService } from './online-users';
import { SOCKET_EVENTS, UserStatusData } from "@/shared/server"

export async function handleConnection(io: Server, socket: Socket, userId: string) {
  const onlineUserIds = OnlineUsersService.getAll();
  socket.emit(SOCKET_EVENTS.USER.ONLINE_USERS_LIST, onlineUserIds);

  // Add user to online users
  OnlineUsersService.add(userId, socket.id);

  // Notify all clients about new online user
  const payload: UserStatusData = {
    userId,
    status: "online"
  };
  io.emit(SOCKET_EVENTS.USER.STATUS, payload);

  // Handle explicit USER.ONLINE events
  socket.on(SOCKET_EVENTS.USER.ONLINE, (userId: string) => {
    OnlineUsersService.add(userId, socket.id);
    const payload: UserStatusData = {
      userId,
      status: "online"
    };
    io.emit(SOCKET_EVENTS.USER.STATUS, payload);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const userId = OnlineUsersService.findBySocketId(socket.id);
    if (userId) {
      OnlineUsersService.remove(userId);

      const payload: UserStatusData = {
        userId,
        status: "offline"
      };
      io.emit(SOCKET_EVENTS.USER.STATUS, payload);
    }
  });
}