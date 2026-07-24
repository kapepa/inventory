import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      'recharts',
      'react-hook-form',
      'zod',
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default withNextIntl(nextConfig);
