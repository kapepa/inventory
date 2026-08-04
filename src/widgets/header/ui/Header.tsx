import { cn } from "@/shared/lib";
import { Logo } from "@/shared/ui";
import { Container } from "@/shared/ui/container";
import { HeaderBar } from "./header-bar";
import { LanguageSwitcherDynamic } from "@/shared/ui/language/language-switcher-dynamic";
import { CategoriesSearchDynamic, ParishesSearchDynamic, ProductsSearchDynamic, UsersSearchDynamic } from "@/features/header-search/ui/header-search-dynamic";

interface HeaderProps {
  showOnline?: boolean,
  language?: boolean
  showSearch?: 'parishes' | 'products' | 'categories' | 'users';
  className?: string;
}

export const Header = ({ showOnline = true, language = false, showSearch, className }: HeaderProps) => {
  return (
    <header className={cn("border-b shadow-lg sticky z-10 bg-background", className)}>
      <Container
        className="flex py-1 md:py-4 justify-between gap-8 md:gap-16 xl:gap-40"
      >
        <Logo />
        {showSearch === "parishes" && <ParishesSearchDynamic />}
        {showSearch === "products" && <ProductsSearchDynamic />}
        {showSearch === "categories" && <CategoriesSearchDynamic />}
        {showSearch === "users" && <UsersSearchDynamic />}
        {language &&
          <div className="flex justify-center items-center">
            <LanguageSwitcherDynamic />
          </div>
        }
        <HeaderBar
          showOnline={showOnline}
          className="hidden md:flex flex-col justify-center h-full"
        />
      </Container>
    </header >
  );
}