import { useAuthStore } from "../auth-store";
import { useInitialUser } from "./use-initials-user";
import { useMounted } from "@/shared";

export function useHydratedUser() {
  const initialUser = useInitialUser();
  const user = useAuthStore(state => state.user);
  const mounted = useMounted();

  return !mounted ? initialUser : user;
}

export function useHydratedIsAdmin() {
  return useHydratedUser()?.role === "ADMIN"
}