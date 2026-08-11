import { cn } from "@/shared/lib/utils";
import { Logo } from "@/shared/ui/logo";
import { Container } from "@/shared/ui/container";
import { HeaderBar } from "./header-bar";
import { ReactNode } from "react";

interface HeaderProps {
  showOnline?: boolean,
  headerActions?: ReactNode | null;
  className?: string;
}

export const Header = ({ showOnline = true, headerActions = null, className }: HeaderProps) => {
  return (
    <header className={cn("border-b shadow-lg sticky z-10 bg-background", className)}>
      <Container
        className="flex py-1 md:py-4 justify-between gap-8 md:gap-16 xl:gap-40"
      >
        <Logo />
        {headerActions}
        <HeaderBar
          showOnline={showOnline}
          className="hidden md:flex flex-col justify-center h-full"
        />
      </Container>
    </header >
  );
}