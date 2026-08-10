import { UsersSearch } from "@/features/header-search/ui/users-search";
import { Header } from "@/widgets/header/ui/Header";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Sidebar />
      <Header
        className="shrink-0"
        headerActions={<UsersSearch />}
      />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </div>
  );
}
