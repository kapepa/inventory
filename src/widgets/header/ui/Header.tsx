import { Logo } from "@/shared/ui";
import { Container } from "@/shared/ui/container";
import { HeaderBar } from "./header-bar";
import { memo } from "react";
import { cn } from "@/shared/lib";
import { ParishesSearch } from "@/features/header-search/ui/parishes-search";
import { ProductsSearch } from "@/features/header-search/ui/products-search";
import { CategoriesSearch } from "@/features/header-search/ui/categories-search";
import { UsersSearch } from "@/features/header-search/ui/users-search";
import { LanguageSwitcherDynamic } from "@/shared/ui/language/language-switcher-dynamic";

interface HeaderProps {
  showOnline?: boolean,
  language?: boolean
  showSearch?: 'parishes' | 'products' | 'categories' | 'users';
  className?: string;
}

export const Header = memo(({ showOnline = true, language = false, showSearch, className }: HeaderProps) => {
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
        {language && <div className="flex justify-center items-center"><LanguageSwitcherDynamic /></div>}
        <HeaderBar
          showOnline={showOnline}
          className="hidden md:flex flex-col justify-center h-full"
        />
      </Container>
    </header >
  );
})