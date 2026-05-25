'use client';

import { Header, Sidebar } from "@/widgets";
import { ModalProvider, ModalRoot } from "@/shared/ui/modal";

export default function ParishesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <Header />
      <Sidebar />
      <main className="z-20 relative pt-16 pl-60">
        {children}
        <ModalRoot />
      </main>
    </ModalProvider>
  );
}