import { DeleteProductProvider } from "@/shared/lib/providers/delete-product-context";
import { Header } from "@/widgets/header/ui/Header";

export default function ParishesLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeleteProductProvider>
      <Header showSearch="parishes" className="shrink-0" />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </DeleteProductProvider>
  );
}

