import { WebSocketProvider } from "@/shared";
import { Header, Sidebar } from "@/widgets";

export default function ParishesListLayout({ children }: { children: React.ReactNode }) {
  return (
    <WebSocketProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header showSearch="parishes" className="shrink-0" />
        <Sidebar />
        <main className="flex-1 min-h-0 flex flex-col">
          {children}
        </main>
      </div>
    </WebSocketProvider>
  );
}
