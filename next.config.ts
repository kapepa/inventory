import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config: NextConfig) => config;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:locale(en|ru)',
        destination: '/:locale/parishes',
        permanent: false
      },
    ];
  },
  images: {
    minimumCacheTTL: 120,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  compress: true,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      'react-hook-form',
      'zod',
      'socket.io-client',
      '@radix-ui/react-tabs',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-slot',
      '@radix-ui/react-label',
      '@radix-ui/react-popover',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-dialog',
      'zustand',
      'clsx',
      'class-variance-authority',
      'tailwind-merge',
      'react-day-picker',
      'axios',
      'react-intersection-observer',
    ],
    optimizeCss: true,
    useLightningcss: true,
  },
  productionBrowserSourceMaps: false,
  staticPageGenerationTimeout: 120,
  // We're removing heavy server packages from the bundle
  serverExternalPackages: [
    '@vitalets/google-translate-api',
    'translate',
    '@prisma/client',
    '@prisma/adapter-pg',
    'nodemailer',
    'cloudinary',
    'pg',
  ],
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));