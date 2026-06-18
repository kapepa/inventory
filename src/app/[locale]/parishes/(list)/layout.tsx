import { Header, Sidebar } from "@/widgets";
import { memo } from "react";

export default memo(
  function ParishesListLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <Header />
        <Sidebar />
        <main>
          {children}
        </main>
      </>
    );
  }
)