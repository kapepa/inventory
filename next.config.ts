import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// const withBundleAnalyzer = process.env.ANALYZE === 'true'
//   ? require('@next/bundle-analyzer')({ enabled: true })
//   : (config: NextConfig) => config;

const nextConfig: NextConfig = {
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
  // Настройка SWC для современных браузеров
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      'react-hook-form',
      'zod',
      'socket.io-client',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-slot',
      '@radix-ui/react-label',
      '@radix-ui/react-popover',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-dialog',
      'sonner',
      'zustand',
      'clsx',
      'class-variance-authority',
      'tailwind-merge',
      'react-day-picker',
      'axios',
      'react-intersection-observer',
    ],
    inlineCss: true,
    optimizeCss: true,
  },
  productionBrowserSourceMaps: false,
  staticPageGenerationTimeout: 120,
  // Исключаем тяжёлые серверные пакеты из bundle
  serverExternalPackages: [
    '@vitalets/google-translate-api',
    'translate',
    '@prisma/client',
    '@prisma/adapter-pg',
    'nodemailer',
    'cloudinary',
    'pg',
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization?.splitChunks,
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          maxSize: 150000, // Уменьшили с 244KB до 150KB
          enforceSizeThreshold: 200000, // Жесткий лимит 200KB
          cacheGroups: {
            ...config.optimization?.splitChunks?.cacheGroups,
            // React и связанные библиотеки
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              name: 'react-vendor',
              priority: 40,
              reuseExistingChunk: true,
            },
            // Radix UI компоненты - разбить на части
            radixui: {
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              name: 'radix-ui',
              chunks: 'all',
              priority: 35,
              reuseExistingChunk: true,
              maxSize: 100000, // Radix UI разбить на chunks по 100KB
            },
            // Next.js и next-intl
            nextjs: {
              test: /[\\/]node_modules[\\/](next|next-intl)[\\/]/,
              name: 'nextjs-vendor',
              priority: 35,
              reuseExistingChunk: true,
            },
            // Zustand store
            zustand: {
              test: /[\\/]node_modules[\\/]zustand[\\/]/,
              name: 'zustand',
              priority: 35,
              reuseExistingChunk: true,
            },

            // Zod validation (async - только в формах)
            zod: {
              test: /[\\/]node_modules[\\/]zod[\\/]/,
              name: 'zod',
              chunks: 'async',
              priority: 30,
            },
            // React Hook Form (async - только в формах)
            'react-hook-form': {
              test: /[\\/]node_modules[\\/](react-hook-form|@hookform)[\\/]/,
              name: 'react-hook-form',
              chunks: 'async',
              priority: 30,
            },
            // React Day Picker (async - только в формах с датами)
            'react-day-picker': {
              test: /[\\/]node_modules[\\/]react-day-picker[\\/]/,
              name: 'react-day-picker',
              chunks: 'async',
              priority: 30,
            },
            // Axios (async - API запросы)
            axios: {
              test: /[\\/]node_modules[\\/]axios[\\/]/,
              name: 'axios',
              chunks: 'async',
              priority: 30,
            },

            'ui-vendor': {
              test: /[\\/]node_modules[\\/](sonner|lucide-react)[\\/]/,
              name: 'ui-vendor',
              priority: 28,
              reuseExistingChunk: true,
            },
            // Socket.io (async)
            socketio: {
              test: /[\\/]node_modules[\\/]socket\.io-client[\\/]/,
              name: 'socket-io',
              chunks: 'async',
              priority: 30,
            },
            // Recharts (async)
            recharts: {
              test: /[\\/]node_modules[\\/]recharts[\\/]/,
              name: 'recharts',
              chunks: 'async',
              priority: 30,
            },
            // Общие vendor библиотеки
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'commons',
              priority: 20,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
};

// export default withBundleAnalyzer(withNextIntl(nextConfig));

export default withNextIntl(nextConfig)