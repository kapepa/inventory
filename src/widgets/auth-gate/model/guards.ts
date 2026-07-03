import { AuthTab } from "./types";

export function isAuthTab(value: unknown): value is AuthTab {
  return value === "login" || value === "register";
}