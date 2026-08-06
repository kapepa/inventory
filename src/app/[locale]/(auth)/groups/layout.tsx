import { DeleteProductProvider } from "@/shared/lib/providers/delete-product-context";
import { Header } from "@/widgets/header/ui/Header";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";

export default function ParishesLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeleteProductProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header showSearch="parishes" className="shrink-0" />
        <Sidebar />
        <main className="flex-1 min-h-0 flex flex-col">
          {children}
        </main>
      </div>
    </DeleteProductProvider>
  );
}

