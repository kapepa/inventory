import { LiveDatetime, ParishesSearch } from "@/features";
import { Logo } from "@/shared";
import { Container } from "@/shared/ui/container";
import { memo } from "react";

interface HeaderProps {
  showSearch?: boolean;
}

export const Header = memo(
  ({ showSearch = true }: HeaderProps) => {
    return (
      <header className="border-b shadow-lg sticky z-40 bg-background">
        <Container
          className="flex py-1 md:py-4 justify-between gap-10 md:gap-16 xl:gap-40"
        >
          <Logo />
          {showSearch && <ParishesSearch />}
          <LiveDatetime
            className="hidden md:block"
          />
        </Container>
      </header >
    );
  }
);