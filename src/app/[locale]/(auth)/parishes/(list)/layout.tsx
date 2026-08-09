import { DeleteParishProvider } from "@/shared/lib/providers/delete-parish-context";
import { Header } from "@/widgets/header/ui/Header";

export default function ParishesListLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeleteParishProvider>
      <Header showSearch="parishes" className="shrink-0" />
      <main className="flex-1 min-h-0 flex flex-col" >
        {children}
      </main >
    </DeleteParishProvider>
  );
}
