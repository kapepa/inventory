import { useMounted } from "@/shared/lib/hooks";
import { useAuthStore } from "../auth-store";
import { useInitialUser } from "./use-initials-user";

export function useHydratedUser() {
  const initialUser = useInitialUser();
  const user = useAuthStore(state => state.user);
  const mounted = useMounted();

  return !mounted ? initialUser : user;
}

export function useHydratedIsAdmin() {
  return useHydratedUser()?.role === "ADMIN"
}