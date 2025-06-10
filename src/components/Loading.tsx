'use client';

import { motion } from 'framer-motion';
import React, { memo } from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
} as const;

const Loading = memo(function Loading({
  size = 'md',
  text = 'Carregando...',
  fullScreen = false,
}: LoadingProps) {
  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 z-50'
    : 'flex items-center justify-center p-4';

  return (
    <div
      className={containerClasses}
      role="status"
      title={text || 'Carregando'}
      aria-label={text || 'Carregando'}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Spinner */}
        <motion.div
          className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin`}
        />

        {/* Loading Text */}
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-700 dark:text-gray-200 text-center"
          >
            {text}
          </motion.p>
        )}
      </div>
    </div>
  );
});

// Skeleton Loading Component
interface SkeletonLoaderProps {
  lines?: number;
  className?: string;
}

export const SkeletonLoader = memo(function SkeletonLoader({
  lines = 3,
  className = '',
}: SkeletonLoaderProps) {
  return (
    <div className={`animate-pulse ${className}`} role="status" aria-label="Loading content">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 dark:bg-gray-700 rounded h-4 mb-3 ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
      <span className="sr-only">Loading content...</span>
    </div>
  );
});

// Card Skeleton
export const CardSkeleton = memo(function CardSkeleton() {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"
      role="status"
      aria-label="Loading card"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
      <span className="sr-only">Loading card content...</span>
    </div>
  );
});

// Button Loading State
interface ButtonLoadingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}

export const ButtonLoading = memo(function ButtonLoading({
  children,
  loading = false,
  loadingText = 'Carregando...',
  className = '',
  disabled = false,
  ...props
}: ButtonLoadingProps) {
  const isDisabled = loading || disabled;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`${className} ${isDisabled ? 'cursor-not-allowed opacity-75' : ''} transition-opacity`}
      title={loading ? loadingText : undefined}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <motion.span
            className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          />
          <span>{loadingText}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
});

// Progress Loading Component
interface ProgressLoadingProps {
  progress: number;
  text?: string;
  showPercentage?: boolean;
}

export const ProgressLoading = memo(function ProgressLoading({
  progress,
  text = 'Carregando...',
  showPercentage = true,
}: ProgressLoadingProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-label={text}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">{text}</span>
        {showPercentage && (
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {clampedProgress}%
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
});

export default Loading;
