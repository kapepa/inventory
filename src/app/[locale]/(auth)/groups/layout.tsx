import { GroupsSearch } from "@/features/header-search/ui/groups-search";
import { Container } from "@/shared/ui/container";
import { Header } from "@/widgets/header/ui/Header";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";

export default function ParishesLayout({ children, content }: { children: React.ReactNode, content: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Sidebar />
      <Header
        className="shrink-0"
        headerActions={<GroupsSearch />}
      />
      <main className="flex-1 min-h-0 flex flex-col">
        <Container className="pt-6 md:pt-16 min-h-0 grid grid-cols-1 lg:grid-cols-3 grid-template-rows gap-4">
          {children}
          {content}
        </Container>
      </main>
    </div>
  );
}

