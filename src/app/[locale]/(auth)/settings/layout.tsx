import { DeleteAccountProvider } from "@/shared/lib/providers/delete-account-context";
import { Header } from "@/widgets/header/ui/Header";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeleteAccountProvider>
      <Header className="shrink-0" />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </DeleteAccountProvider>
  );
}
