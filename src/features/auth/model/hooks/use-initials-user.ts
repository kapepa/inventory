import { useContext } from "react";
import { InitialUserContext } from "../../lib/auth-provider";

export const useInitialUser = () => useContext(InitialUserContext);