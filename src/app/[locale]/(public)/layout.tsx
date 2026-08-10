import { LanguageSwitcherDynamic } from "@/shared/ui/language/language-switcher-dynamic";
import { Header } from "@/widgets/header/ui/Header";

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header
        showOnline={false}
        headerActions={
          <div className="flex justify-center items-center">
            <LanguageSwitcherDynamic />
          </div>
        }
        className="shrink-0"
      />
      <main className="flex-1 min-h-0 flex flex-col">
        {children}
      </main>
    </div>
  );
}
