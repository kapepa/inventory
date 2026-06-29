import { Header, Sidebar } from "@/widgets";

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header className="shrink-0" showSearch="categories" />
      <Sidebar />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </div>
  );
}