# 🚀 Performance Optimization Plan - Bora Escrever Platform

## Executive Summary

This document outlines a comprehensive performance optimization strategy for the Bora Escrever educational platform, focusing on achieving excellent Core Web Vitals scores, reducing bundle sizes, and improving overall user experience through strategic code splitting, lazy loading, and image optimization.

---

## Table of Contents

1. [Current State Analysis](#1-current-state-analysis)
2. [Performance Goals & Metrics](#2-performance-goals--metrics)
3. [Code Splitting Strategy](#3-code-splitting-strategy)
4. [Lazy Loading Implementation](#4-lazy-loading-implementation)
5. [Image Optimization](#5-image-optimization)
6. [Bundle Size Optimization](#6-bundle-size-optimization)
7. [Performance Monitoring](#7-performance-monitoring)
8. [Implementation Timeline](#8-implementation-timeline)
9. [Testing & Validation](#9-testing--validation)
10. [Expected Results](#10-expected-results)

---

## 1. Current State Analysis

### Current Issues Identified

- ❌ **No advanced code splitting** beyond basic route-based splitting
- ❌ **All components loaded upfront** - no lazy loading strategy
- ❌ **Large initial JavaScript bundle** affecting load times
- ❌ **No image optimization strategy** in place
- ❌ **Heavy dependencies** loaded synchronously (Firebase, OpenAI)
- ❌ **No performance monitoring** or budget enforcement
- ❌ **Missing resource hints** (prefetch, preconnect, preload)

### Current Tech Stack

- Next.js 15.3.3
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Firebase
- OpenAI SDK

---

## 2. Performance Goals & Metrics

### Core Web Vitals Targets

```javascript
const performanceTargets = {
  // Largest Contentful Paint
  LCP: {
    target: '< 2.5s',
    good: '< 2.0s',
    measurement: 'Time when largest content element becomes visible',
  },

  // First Input Delay
  FID: {
    target: '< 100ms',
    good: '< 50ms',
    measurement: 'Time from user interaction to browser response',
  },

  // Cumulative Layout Shift
  CLS: {
    target: '< 0.1',
    good: '< 0.05',
    measurement: 'Visual stability score',
  },
};
```

### Additional Performance Metrics

```javascript
const additionalMetrics = {
  TTI: '< 3.8s', // Time to Interactive
  TBT: '< 200ms', // Total Blocking Time
  SpeedIndex: '< 3.4s', // Speed Index

  // Bundle size targets
  bundles: {
    initial: '< 150KB',
    lazy: '< 50KB per chunk',
    total: '< 300KB',
  },
};
```

---

## 3. Code Splitting Strategy

### 3.1 Enhanced Route-Based Splitting

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Existing config...

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
    ],
  },

  webpack: (config, { dev, isServer }) => {
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
            test: /[\\/]node_modules[\\/](clsx|tailwind-merge|date-fns|zod)[\\/]/,
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
    }

    return config;
  },
};

export default nextConfig;
```

### 3.2 Component-Level Dynamic Imports

```typescript
// src/utils/lazyComponents.ts
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// Loading skeletons
import { EditorSkeleton } from '@/components/skeletons/EditorSkeleton';
import { ChartSkeleton } from '@/components/skeletons/ChartSkeleton';
import { ChatSkeleton } from '@/components/skeletons/ChatSkeleton';

// Type-safe dynamic import helper
export function createDynamicComponent<T = {}>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options?: {
    loading?: ComponentType;
    ssr?: boolean;
  }
) {
  return dynamic(importFn, options);
}

// Lazy-loaded components registry
export const LazyComponents = {
  // Essay Editor Components
  EssayEditor: createDynamicComponent(() => import('@/components/features/essay/EssayEditor'), {
    loading: EditorSkeleton,
    ssr: false,
  }),

  ThemeSuggestions: createDynamicComponent(
    () => import('@/components/features/essay/ThemeSuggestions')
  ),

  CorrectionPanel: createDynamicComponent(
    () => import('@/components/features/essay/CorrectionPanel')
  ),

  // Dashboard Components
  StudyPlan: createDynamicComponent(() => import('@/components/features/dashboard/StudyPlan')),

  ProgressChart: createDynamicComponent(
    () => import('@/components/features/dashboard/ProgressChart'),
    { loading: ChartSkeleton, ssr: false }
  ),

  // AI Components
  MariaChat: createDynamicComponent(() => import('@/components/features/ai/MariaChat'), {
    loading: ChatSkeleton,
    ssr: false,
  }),

  // Heavy UI Components
  MotionDiv: createDynamicComponent(
    () => import('framer-motion').then((mod) => ({ default: mod.motion.div })),
    { ssr: false }
  ),
};
```

### 3.3 Route-Specific Optimization

```typescript
// src/app/escrever/page.tsx - Optimized version
'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { EditorSkeleton } from '@/components/skeletons/EditorSkeleton';

// Critical imports only
import {
  Save,
  FileText,
  Clock,
  Send
} from 'lucide-react';

// Lazy load non-critical components
const EssayEditor = lazy(() => import('@/components/features/essay/EssayEditor'));
const ThemeSuggestions = lazy(() => import('@/components/features/essay/ThemeSuggestions'));
const WritingTips = lazy(() => import('@/components/features/essay/WritingTips'));
const StructureGuide = lazy(() => import('@/components/features/essay/StructureGuide'));

// Lazy load heavy dependencies
const loadFirebaseEssays = () => import('@/services/firebase/essays');

export default function EscreverPage() {
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Progressive enhancement
  useEffect(() => {
    // Load editor after initial render
    requestIdleCallback(() => {
      setIsEditorReady(true);
    });

    // Preload Firebase for faster saves
    loadFirebaseEssays();
  }, []);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Critical content - rendered immediately */}
        <header className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold">Editor de Redação</h1>
          <p className="mt-1 text-gray-600">
            Escreva sua redação e receba feedback personalizado
          </p>
        </header>

        {/* Main editor - lazy loaded */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {isEditorReady ? (
              <Suspense fallback={<EditorSkeleton />}>
                <EssayEditor />
              </Suspense>
            ) : (
              <EditorSkeleton />
            )}
          </div>

          {/* Sidebar components - lazy loaded */}
          <aside className="space-y-6">
            <Suspense fallback={<div className="h-48 bg-gray-100 rounded-lg animate-pulse" />}>
              <ThemeSuggestions />
            </Suspense>

            <Suspense fallback={<div className="h-64 bg-gray-100 rounded-lg animate-pulse" />}>
              <WritingTips />
            </Suspense>

            <Suspense fallback={<div className="h-56 bg-gray-100 rounded-lg animate-pulse" />}>
              <StructureGuide />
            </Suspense>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
```

---

## 4. Lazy Loading Implementation

### 4.1 Progressive Loading Hook

```typescript
// src/hooks/useProgressiveLoading.ts
import { useState, useEffect } from 'react';

type LoadPhase = 'critical' | 'enhanced' | 'complete';

interface ProgressiveLoadingOptions {
  onEnhanced?: () => void;
  onComplete?: () => void;
}

export function useProgressiveLoading(options?: ProgressiveLoadingOptions) {
  const [loadPhase, setLoadPhase] = useState<LoadPhase>('critical');

  useEffect(() => {
    // Phase 2: Load enhanced features after initial render
    const enhancedTimer = requestIdleCallback(() => {
      setLoadPhase('enhanced');
      options?.onEnhanced?.();
    });

    // Phase 3: Load complete features after user interaction
    let completeTimer: number;
    const loadComplete = () => {
      completeTimer = requestIdleCallback(() => {
        setLoadPhase('complete');
        options?.onComplete?.();
      });
    };

    // Trigger complete phase on interaction or after delay
    const interactionEvents = ['scroll', 'click', 'touchstart'];
    interactionEvents.forEach((event) => {
      window.addEventListener(event, loadComplete, { once: true, passive: true });
    });

    // Fallback: load complete after 5 seconds
    const fallbackTimer = setTimeout(loadComplete, 5000);

    return () => {
      cancelIdleCallback(enhancedTimer);
      if (completeTimer) cancelIdleCallback(completeTimer);
      clearTimeout(fallbackTimer);
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, loadComplete);
      });
    };
  }, [options]);

  return {
    loadPhase,
    isCritical: loadPhase === 'critical',
    isEnhanced: loadPhase === 'enhanced' || loadPhase === 'complete',
    isComplete: loadPhase === 'complete',
  };
}
```

### 4.2 Intersection Observer Component

```typescript
// src/components/LazyLoad.tsx
import { useRef, useState, useEffect, ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number | number[];
  onVisible?: () => void;
}

export function LazyLoad({
  children,
  fallback = <div className="h-32 bg-gray-100 animate-pulse rounded-lg" />,
  rootMargin = '50px',
  threshold = 0.1,
  onVisible,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible?.();
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold, onVisible]);

  return (
    <div ref={elementRef}>
      {isVisible ? children : fallback}
    </div>
  );
}
```

### 4.3 Smart Prefetching

```typescript
// src/components/SmartLink.tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';

interface SmartLinkProps {
  href: string;
  children: React.ReactNode;
  prefetchOn?: 'hover' | 'visible' | 'none';
  className?: string;
}

export function SmartLink({
  href,
  children,
  prefetchOn = 'hover',
  className,
  ...props
}: SmartLinkProps) {
  const router = useRouter();
  const prefetchedRef = useRef(false);

  const handlePrefetch = useCallback(() => {
    if (!prefetchedRef.current) {
      router.prefetch(href);
      prefetchedRef.current = true;
    }
  }, [href, router]);

  // Prefetch on hover
  const handleMouseEnter = prefetchOn === 'hover' ? handlePrefetch : undefined;

  // Prefetch when visible
  useEffect(() => {
    if (prefetchOn === 'visible') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            handlePrefetch();
            observer.disconnect();
          }
        },
        { rootMargin: '50px' }
      );

      const element = document.querySelector(`[href="${href}"]`);
      if (element) observer.observe(element);

      return () => observer.disconnect();
    }
  }, [href, prefetchOn, handlePrefetch]);

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
```

---

## 5. Image Optimization

### 5.1 Optimized Image Component

```typescript
// src/components/OptimizedImage.tsx
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  className?: string;
  sizes?: string;
  onLoad?: () => void;
}

// Generate blur data URL for placeholder
function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, width, height);
  }
  return canvas.toDataURL();
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  className,
  sizes,
  onLoad,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  // Default sizes for responsive images
  const defaultSizes = sizes || `
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  `;

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400">Failed to load image</span>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {(priority || isInView) && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          sizes={defaultSizes}
          placeholder="blur"
          blurDataURL={generateBlurDataURL()}
          onLoadingComplete={() => {
            setIsLoading(false);
            onLoad?.();
          }}
          onError={() => setError(true)}
          className={`
            transition-opacity duration-300
            ${isLoading ? 'opacity-0' : 'opacity-100'}
          `}
        />
      )}
    </div>
  );
}
```

### 5.2 Image Configuration

```typescript
// src/lib/images/config.ts
export const imageConfig = {
  // Device sizes for responsive images
  deviceSizes: [320, 640, 768, 1024, 1280, 1536, 1920, 2560],

  // Image sizes for different layouts
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],

  // Supported formats
  formats: ['image/webp', 'image/avif'],

  // Quality settings
  quality: {
    thumbnail: 60,
    default: 75,
    high: 90,
  },

  // Cache settings
  minimumCacheTTL: 31536000, // 1 year

  // Loader configuration
  loader: 'default',

  // Domains for external images
  domains: ['res.cloudinary.com', 'images.unsplash.com', 'firebasestorage.googleapis.com'],
};

// Image optimization utilities
export function getImageUrl(
  src: string,
  width: number,
  quality: number = imageConfig.quality.default
): string {
  // If using Cloudinary or similar CDN
  if (src.includes('cloudinary.com')) {
    const params = [`w_${width}`, `q_${quality}`, 'f_auto', 'c_limit', 'dpr_auto'];

    // Insert transformation parameters
    return src.replace('/upload/', `/upload/${params.join(',')}/`);
  }

  // Default Next.js image optimization
  return src;
}
```

### 5.3 Responsive Picture Component

```typescript
// src/components/ResponsivePicture.tsx
interface ResponsivePictureProps {
  src: string;
  alt: string;
  sources?: Array<{
    srcSet: string;
    media?: string;
    type?: string;
  }>;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function ResponsivePicture({
  src,
  alt,
  sources = [],
  className,
  loading = 'lazy',
}: ResponsivePictureProps) {
  return (
    <picture className={className}>
      {/* WebP sources */}
      <source
        type="image/webp"
        srcSet={`
          ${src}?w=640&fm=webp 640w,
          ${src}?w=1024&fm=webp 1024w,
          ${src}?w=1920&fm=webp 1920w
        `}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* AVIF sources for modern browsers */}
      <source
        type="image/avif"
        srcSet={`
          ${src}?w=640&fm=avif 640w,
          ${src}?w=1024&fm=avif 1024w,
          ${src}?w=1920&fm=avif 1920w
        `}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Custom sources */}
      {sources.map((source, index) => (
        <source key={index} {...source} />
      ))}

      {/* Fallback */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
```

---

## 6. Bundle Size Optimization

### 6.1 Import Cost Analysis

```typescript
// scripts/analyze-bundle.js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer ? '../analyze/server.html' : '../analyze/client.html',
          openAnalyzer: false,
        })
      );
    }
    return config;
  },
});
```

### 6.2 Tree Shaking Optimization

```typescript
// src/utils/imports.ts
// ❌ Bad - imports entire library
import * as Icons from 'lucide-react';

// ✅ Good - imports only what's needed
import { Home, User, Settings } from 'lucide-react';

// For dynamic icon imports
export async function getIcon(name: string) {
  const icons = await import('lucide-react');
  return icons[name];
}

// Utility imports optimization
// ❌ Bad
import _ from 'lodash';
const result = _.debounce(fn, 300);

// ✅ Good
import debounce from 'lodash-es/debounce';
const result = debounce(fn, 300);
```

### 6.3 Dependency Optimization

```json
// package.json optimizations
{
  "dependencies": {
    // Use lighter alternatives
    "dayjs": "^1.11.0", // Instead of moment.js
    "clsx": "^2.1.1", // Instead of classnames
    "nanoid": "^5.0.0", // Instead of uuid
    "mitt": "^3.0.0", // Instead of events

    // Tree-shakeable versions
    "lodash-es": "^4.17.21", // Instead of lodash
    "date-fns": "^3.0.0" // Modular date library
  },

  "devDependencies": {
    // Bundle analysis
    "@next/bundle-analyzer": "^14.0.0",
    "webpack-bundle-analyzer": "^4.10.0",

    // Build optimization
    "terser-webpack-plugin": "^5.3.0",
    "@babel/plugin-transform-runtime": "^7.23.0"
  }
}
```

---

## 7. Performance Monitoring

### 7.1 Web Vitals Tracking

```typescript
// src/lib/analytics/webVitals.ts
import { getCLS, getFID, getLCP, getTTFB, getFCP } from 'web-vitals';

interface Metric {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType: string;
}

// Analytics service integration
function sendToAnalytics(metric: Metric) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  }

  // Custom analytics endpoint
  if (navigator.sendBeacon) {
    const body = JSON.stringify({
      ...metric,
      url: window.location.href,
      timestamp: Date.now(),
    });

    navigator.sendBeacon('/api/analytics/vitals', body);
  }
}

// Initialize web vitals reporting
export function reportWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
  getFCP(sendToAnalytics);
}

// Custom performance marks
export function measurePerformance(markName: string) {
  if (typeof window !== 'undefined' && window.performance) {
    performance.mark(markName);

    // Measure from navigation start
    performance.measure(`${markName}-from-start`, 'navigationStart', markName);

    // Get the measurement
    const measure = performance.getEntriesByName(`${markName}-from-start`)[0];

    if (measure) {
      sendToAnalytics({
        name: markName,
        value: measure.duration,
        delta: 0,
        id: `${markName}-${Date.now()}`,
        navigationType: 'navigate',
      });
    }
  }
}
```

### 7.2 Performance Budget Monitoring

```typescript
// src/lib/performance/budgets.ts
export interface PerformanceBudget {
  [key: string]: {
    warning: number;
    error: number;
    unit: 'KB' | 'ms' | 'score';
  };
}

export const performanceBudgets: PerformanceBudget = {
  // Bundle sizes (in KB)
  'bundle.js': { warning: 150, error: 200, unit: 'KB' },
  'bundle.css': { warning: 50, error: 75, unit: 'KB' },
  'total.size': { warning: 300, error: 400, unit: 'KB' },

  // Core Web Vitals
  lcp: { warning: 2500, error: 4000, unit: 'ms' },
  fid: { warning: 100, error: 300, unit: 'ms' },
  cls: { warning: 0.1, error: 0.25, unit: 'score' },

  // Other metrics
  tti: { warning: 3800, error: 7300, unit: 'ms' },
  tbt: { warning: 200, error: 600, unit: 'ms' },
};

// Budget validation
export function validateBudget(metric: string, value: number): 'pass' | 'warning' | 'error' {
  const budget = performanceBudgets[metric];
  if (!budget) return 'pass';

  if (value > budget.error) return 'error';
  if (value > budget.warning) return 'warning';
  return 'pass';
}
```

### 7.3 Real User Monitoring (RUM)

```typescript
// src/lib/analytics/rum.ts
interface RUMData {
  url: string;
  userAgent: string;
  connection?: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  metrics: Record<string, number>;
}

export class RealUserMonitoring {
  private buffer: RUMData[] = [];
  private flushInterval = 30000; // 30 seconds

  constructor() {
    this.startCollection();
    this.scheduleFlush();
  }

  private startCollection() {
    // Collect device info
    const deviceInfo = this.getDeviceInfo();

    // Observe long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric('long-task', entry.duration);
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
    }

    // Monitor page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.flush();
      }
    });
  }

  private getDeviceInfo() {
    const nav = navigator as any;

    return {
      connection: nav.connection?.effectiveType,
      deviceMemory: nav.deviceMemory,
      hardwareConcurrency: nav.hardwareConcurrency,
    };
  }
```
