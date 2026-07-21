import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface OnlineUserstState {
  onlineUsers: string[];

  addOnlineUser: (userId: string) => void;
  setOnlineUsers: (userIds: string[]) => void;
  removeOnlineUser: (userId: string) => void;
}

export const useOnlineUserstStore = create<OnlineUserstState>()(
  devtools(
    (set) => ({
      onlineUsers: [],
      addOnlineUser: (userId) =>
        set((state) => ({
          onlineUsers: state.onlineUsers.includes(userId)
            ? state.onlineUsers
            : [...state.onlineUsers, userId],
        }), false, 'addOnlineUser'),

      setOnlineUsers: (userIds: string[]) =>
        set({ onlineUsers: userIds }, false, 'setOnlineUser'),

      removeOnlineUser: (userId) =>
        set((state) => {
          const findUserIdIndex = state.onlineUsers.findIndex((id) => id === userId)
          if (findUserIdIndex !== -1) state.onlineUsers.splice(findUserIdIndex, 1)

          return ({
            onlineUsers: state.onlineUsers,
          })
        }, false, 'removeOnlineUser'),
    }),
    { name: 'online-users-store', enabled: process.env.NODE_ENV === 'development' }
  )
); 