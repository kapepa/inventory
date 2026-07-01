import { Header, Sidebar } from "@/widgets";

export default function CategoriesIdLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header className="shrink-0" showSearch="products" />
      <Sidebar />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </div>
  );
}