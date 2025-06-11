import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configurações básicas
  reactStrictMode: true,
  poweredByHeader: false,

  // Output mode for static export
  output: 'export',

  // Otimizações experimentais
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@heroicons/react',
      'clsx',
      'tailwind-merge',
      'date-fns',
      '@dnd-kit/core',
      '@dnd-kit/sortable',
      'zod',
      'react-hook-form',
    ],
  },

  // Configuração otimizada de imagens
  images: {
    unoptimized: true, // Required for static export if not using a custom image loader
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [320, 640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // This CSP is for <img src> inlined SVGs, not the main site CSP
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'firebasestorage.googleapis.com'],
  },

  // Compressão habilitada
  compress: true,

  // Remover console.log em produção
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },

  // Headers de performance e segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Webpack customizations
  webpack: (config, { dev, isServer }) => {
    // Otimizações de bundle
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          // React ecosystem - always needed
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: 'react-vendor',
            priority: 20,
            reuseExistingChunk: true,
          },

          // Framework essentials
          framework: {
            test: /[\\/]node_modules[\\/](next|@next)[\\/]/,
            name: 'framework',
            priority: 19,
            reuseExistingChunk: true,
          },

          // UI libraries - loaded on demand
          ui: {
            test: /[\\/]node_modules[\\/](framer-motion|@dnd-kit|lucide-react|@heroicons)[\\/]/,
            name: 'ui-vendor',
            priority: 15,
            reuseExistingChunk: true,
          },

          // Utilities - small, frequently used
          utils: {
            test: /[\\/]node_modules[\\/](clsx|tailwind-merge|date-fns|zod|nanoid)[\\/]/,
            name: 'utils-vendor',
            priority: 14,
            reuseExistingChunk: true,
          },

          // Heavy libraries - lazy loaded
          firebase: {
            test: /[\\/]node_modules[\\/](@?firebase)[\\/]/,
            name: 'firebase-vendor',
            priority: 10,
            chunks: 'async',
          },

          // OpenAI - lazy loaded
          openai: {
            test: /[\\/]node_modules[\\/](openai)[\\/]/,
            name: 'openai-vendor',
            priority: 9,
            chunks: 'async',
          },

          // Default vendor chunk
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 1,
            reuseExistingChunk: true,
          },

          // Common modules
          common: {
            name: 'common',
            minChunks: 2,
            priority: 0,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };

      // Enable module concatenation
      config.optimization.concatenateModules = true;

      // Minimize dead code
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    return config;
  },
};

export default nextConfig;
