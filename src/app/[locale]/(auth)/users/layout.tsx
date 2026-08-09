import { Header } from "@/widgets/header/ui/Header";

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header showSearch="users" className="shrink-0" />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </>
  );
}
