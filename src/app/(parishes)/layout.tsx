import { Header } from "@/widgets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Приходы | Inventory",
  description: "Управление приходами и инвентарем",
};

export default function ParishesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
};