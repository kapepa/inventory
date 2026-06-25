import { LiveDatetime, ParishesSearch, ProductsSearch } from "@/features";
import { cn, Logo } from "@/shared";
import { Container } from "@/shared/ui/container";
import { memo } from "react";

interface HeaderProps {
  showSearch?: "parishes" | "products";
  className?: string;
}

export const Header = memo(
  ({ className, showSearch }: HeaderProps) => {
    return (
      <header className={cn("border-b shadow-lg sticky z-10 bg-background", className)}>
        <Container
          className="flex py-1 md:py-4 justify-between gap-8 md:gap-16 xl:gap-40"
        >
          <Logo />
          {showSearch === "parishes" && <ParishesSearch />}
          {showSearch === "products" && <ProductsSearch />}
          <LiveDatetime
            className="hidden md:block"
          />
        </Container>
      </header >
    );
  }
);