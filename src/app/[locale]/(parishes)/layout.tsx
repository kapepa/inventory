import { Header, Sidebar } from "@/widgets";

export default function ParishesLayout({ children }: { children: React.ReactNode }) {
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