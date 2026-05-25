import { Container } from "@/shared/ui/container";
import { Button } from "@/shared/ui/button";
import { Logo } from "@/shared/ui/logo";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";
import { NavLink } from "./ui/nav-link";
import { ProfileAvatar } from "./ui/profile-avatar";
import { getFirstLetter } from "./lib/get-first-letter";
import { getRandomColor } from "./lib/get-random-color";
import { cn } from "./lib/utils";

//common
export { Container, Button, Logo, Input, Skeleton, NavLink, ProfileAvatar };
//lib
export { cn, getFirstLetter, getRandomColor }


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