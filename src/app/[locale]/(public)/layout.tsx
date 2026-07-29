import { ProvidersUIClient } from "../providers-client";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProvidersUIClient>
      {children}
    </ProvidersUIClient>
  );
}
