import { Header, Sidebar } from "@/widgets";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header showSearch="products" className="shrink-0" />
      <Sidebar />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </div>
  );
}
