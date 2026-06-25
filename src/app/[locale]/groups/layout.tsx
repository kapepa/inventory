import { Header, Sidebar } from "@/widgets";
import { memo } from "react";

export default memo(
  function ParishesLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col h-screen overflow-hidden">
        <Header showSearch="parishes" className="shrink-0" />
        <Sidebar />
        <main className="flex-1 min-h-0 flex flex-col">
          {children}
        </main>
      </div>
    );
  }
)
