import "./globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: '/svgs/shield-user.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
