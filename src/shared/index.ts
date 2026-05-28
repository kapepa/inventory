export { Container } from "@/shared/ui/container";
export { Button } from "@/shared/ui/button";
export { Logo } from "@/shared/ui/logo";
export { Input } from "@/shared/ui/input";
export { Skeleton } from "@/shared/ui/skeleton";
export { NavLink } from "./ui/nav-link";
export { ProfileAvatar } from "./ui/profile-avatar";
export { Toaster } from "./ui/sonner";
export { ModalContents, ModalBody, ModalFooter, ModalHeader } from "./ui/modal/modal-contents"

//constants
export { PAGINATION_PARISHES_DEFAULTS } from "./constants/pagination"

//locales
export { LOCALES_LANGUAGES } from "./locales/locale"

//lib
export { cn } from "./lib/utils";
export { axiosInstance } from "./lib/axios/instance";
export { formatUAH, formatUSD } from "./lib/currency/format-currency";
export { getFirstLetter } from "./lib/get-first-letter";
export { getRandomColor } from "./lib/get-random-color";

import * as DropdownMenuExports from "./ui/dropdown-menu";
// Dropdown Menu
export const DropdownMenu = DropdownMenuExports.DropdownMenu;
export const DropdownMenuPortal = DropdownMenuExports.DropdownMenuPortal;
export const DropdownMenuTrigger = DropdownMenuExports.DropdownMenuTrigger;
export const DropdownMenuContent = DropdownMenuExports.DropdownMenuContent;
export const DropdownMenuGroup = DropdownMenuExports.DropdownMenuGroup;
export const DropdownMenuLabel = DropdownMenuExports.DropdownMenuLabel;
export const DropdownMenuItem = DropdownMenuExports.DropdownMenuItem;
export const DropdownMenuCheckboxItem = DropdownMenuExports.DropdownMenuCheckboxItem;
export const DropdownMenuRadioGroup = DropdownMenuExports.DropdownMenuRadioGroup;
export const DropdownMenuRadioItem = DropdownMenuExports.DropdownMenuRadioItem;
export const DropdownMenuSeparator = DropdownMenuExports.DropdownMenuSeparator;
export const DropdownMenuShortcut = DropdownMenuExports.DropdownMenuShortcut;
export const DropdownMenuSub = DropdownMenuExports.DropdownMenuSub;
export const DropdownMenuSubTrigger = DropdownMenuExports.DropdownMenuSubTrigger;
export const DropdownMenuSubContent = DropdownMenuExports.DropdownMenuSubContent;

import * as TooltipExports from "./ui/tooltip";
// Tooltip
export const Tooltip = TooltipExports.Tooltip;
export const TooltipContent = TooltipExports.TooltipContent;
export const TooltipProvider = TooltipExports.TooltipProvider;
export const TooltipTrigger = TooltipExports.TooltipTrigger;

import * as PopoverExports from "./ui/popover";
import { ModalContents } from "./ui/modal";
// Popover
export const Popover = PopoverExports.Popover;
export const PopoverTrigger = PopoverExports.PopoverTrigger;
export const PopoverContent = PopoverExports.PopoverContent;
export const PopoverAnchor = PopoverExports.PopoverAnchor;

export type { LocalesLanguages } from "./locales/locale"