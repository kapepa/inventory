import { ParishesSearch } from "@/features/header-search/ui/parishes-search";
import { Header } from "@/widgets/header/ui/Header";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";

export default function ParishesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Sidebar />
      <Header
        className="shrink-0"
        headerActions={<ParishesSearch />}
      />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </div>
  );
}

