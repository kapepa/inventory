import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 60,
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
      'socket.io-client',
      'leaflet',
      '@radix-ui/react-tabs',
      'sonner',
      'zustand',
      'clsx',
      'class-variance-authority',
      'tailwind-merge',
    ],
    optimizeCss: true,
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: false,
  generateEtags: true,
  staticPageGenerationTimeout: 120,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization?.splitChunks,
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            ...config.optimization?.splitChunks?.cacheGroups,
            // React и связанные библиотеки
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              name: 'react-vendor',
              priority: 40,
              reuseExistingChunk: true,
            },
            // Radix UI компоненты
            radixui: {
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              name: 'radix-ui',
              priority: 35,
              reuseExistingChunk: true,
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
            // Socket.io (async)
            socketio: {
              test: /[\\/]node_modules[\\/]socket\.io-client[\\/]/,
              name: 'socket-io',
              chunks: 'async',
              priority: 30,
            },
            // Leaflet (async)
            leaflet: {
              test: /[\\/]node_modules[\\/](leaflet|react-leaflet)[\\/]/,
              name: 'leaflet',
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

export default withBundleAnalyzer(withNextIntl(nextConfig));
