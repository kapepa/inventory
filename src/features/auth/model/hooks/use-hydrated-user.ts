import { useEffect } from "react";
import { useAuthStore } from "../auth-store";
import { useInitialUser } from "./use-initials-user";

export function useHydratedUser() {
  const initialUser = useInitialUser();
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (user === null && initialUser !== null) {
      useAuthStore.setState({
        user: initialUser,
        isLoading: false,
        isAuthenticated: !!initialUser
      });
    }
  }, [initialUser]);

  return user ?? initialUser;
}

export function useHydratedIsAdmin() {
  return useHydratedUser()?.role === "ADMIN"
}