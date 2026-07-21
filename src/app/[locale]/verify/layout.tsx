import { Header, Sidebar } from "@/widgets";

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header showOnline={false} language={true} className="shrink-0" />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </div>
  );
}
