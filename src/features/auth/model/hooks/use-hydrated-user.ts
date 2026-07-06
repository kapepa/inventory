import { useAuthStore } from "../auth-store";
import { useInitialUser } from "./use-initials-user";
import { useMounted } from "@/shared";

export const useHydratedUser = () => {
  const initialUser = useInitialUser();
  const user = useAuthStore(state => state.user)
  const mounte = useMounted()

  return !!user || mounte ? user : initialUser;
}