import { DeleteCategoryProvider } from "@/shared/lib/providers/delete-category-context";
import { Header } from "@/widgets/header/ui/Header";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeleteCategoryProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header className="shrink-0" showSearch="categories" />
        <Sidebar />
        <main className="flex-1 min-h-0 flex flex-col">
          {children}
        </main>
      </div>
    </DeleteCategoryProvider>
  );
}