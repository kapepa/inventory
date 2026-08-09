import "./globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: '/svgs/shield-user.svg',
  },
  other: {
    'preconnect': 'https://res.cloudinary.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}