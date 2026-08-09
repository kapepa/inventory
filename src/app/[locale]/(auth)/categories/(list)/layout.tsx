import { DeleteCategoryProvider } from "@/shared/lib/providers/delete-category-context";
import { Header } from "@/widgets/header/ui/Header";

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeleteCategoryProvider>
      <Header className="shrink-0" showSearch="categories" />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </DeleteCategoryProvider>
  );
}