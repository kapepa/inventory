import { useAuthStore } from "../auth-store";
import { useInitialUser } from "./use-initials-user";
import { useMounted } from "@/shared";

export const useHydratedUser = () => {
  const initialUser = useInitialUser();
  const user = useAuthStore(state => state.user)
  const mounted = useMounted()

  return !!user || mounted ? user : initialUser;
}