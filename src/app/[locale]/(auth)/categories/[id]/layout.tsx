import { CategoriesSearch } from "@/features/header-search/ui/categories-search";
import { Header } from "@/widgets/header/ui/Header";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";

export default function CategoriesIdLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Sidebar />
      <Header
        className="shrink-0"
        headerActions={<CategoriesSearch />}
      />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </div>
  );
}