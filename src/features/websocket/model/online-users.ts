const onlineUsers = new Map<string, string>();

export const OnlineUsersService = {
  add(userId: string, socketId: string): void {
    onlineUsers.set(userId, socketId);
    console.log('[OnlineUsers] User added:', userId, 'Total online:', onlineUsers.size);
  },

  remove(userId: string): boolean {
    const removed = onlineUsers.delete(userId);
    if (removed) {
      console.log('[OnlineUsers] User removed:', userId, 'Total online:', onlineUsers.size);
    }
    return removed;
  },

  findBySocketId(socketId: string): string | undefined {
    for (const [userId, sid] of onlineUsers.entries()) {
      if (sid === socketId) {
        return userId;
      }
    }
    return undefined;
  },

  getAll(): string[] {
    return Array.from(onlineUsers.keys());
  },

  isOnline(userId: string): boolean {
    return onlineUsers.has(userId);
  },

  getCount(): number {
    return onlineUsers.size;
  },
};