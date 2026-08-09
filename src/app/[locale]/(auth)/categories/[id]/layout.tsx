import { DeleteProductProvider } from "@/shared/lib/providers/delete-product-context";
import { Header } from "@/widgets/header/ui/Header";

export default function CategoriesIdLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeleteProductProvider>
      <Header className="shrink-0" showSearch="products" />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </DeleteProductProvider>
  );
}