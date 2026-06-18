import { Header, Sidebar } from "@/widgets";
import { memo } from "react";

export default memo(
  function ParishesIdLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <Header showSearch={false} />
        <Sidebar />
        <main>
          {children}
        </main>
      </>
    );
  }
)