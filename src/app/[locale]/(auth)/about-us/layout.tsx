import { Header } from "@/widgets/header/ui/Header";

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header className="shrink-0" />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </>
  );
}
