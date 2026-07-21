import { CategoriesSearch, ParishesSearch, ProductsSearch, UsersSearch } from "@/features";
import { cn, LanguageSwitcher, Logo } from "@/shared";
import { Container } from "@/shared/ui/container";
import { memo } from "react";
import { HeaderBar } from "./header-bar";

interface HeaderProps {
  showOnline?: boolean,
  language?: boolean
  showSearch?: 'parishes' | 'products' | 'categories' | 'users';
  className?: string;
}

export const Header = memo(
  ({ showOnline = true, language = false, showSearch, className }: HeaderProps) => {
    return (
      <header className={cn("border-b shadow-lg sticky z-10 bg-background", className)}>
        <Container
          className="flex py-1 md:py-4 justify-between gap-8 md:gap-16 xl:gap-40"
        >
          <Logo />
          {showSearch === "parishes" && <ParishesSearch />}
          {showSearch === "products" && <ProductsSearch />}
          {showSearch === "categories" && <CategoriesSearch />}
          {showSearch === "users" && <UsersSearch />}
          {language && <LanguageSwitcher />}
          <HeaderBar
            showOnline={showOnline}
            className="hidden md:flex flex-col justify-center h-full"
          />
        </Container>
      </header >
    );
  }
);