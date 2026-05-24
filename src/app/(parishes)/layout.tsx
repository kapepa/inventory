'use client';

import { Header, Sidebar } from "@/widgets";
import { ModalProvider, ModalRoot } from "@/shared/ui/modal";

export default function ParishesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <Header />
      <Sidebar />
      <main>
        {children}
        <ModalRoot />
      </main>
    </ModalProvider>
  );
}