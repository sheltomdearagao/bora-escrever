'use client';

import ErrorBoundary, { ErrorType } from './ErrorBoundary';
import React from 'react';

interface ClientErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error?: Error;
    errorType?: ErrorType;
    resetError: () => void;
    navigateHome: () => void;
  }>;
}

export default function ClientErrorBoundary({ children, fallback }: ClientErrorBoundaryProps) {
  return fallback ? (
    <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>
  ) : (
    <ErrorBoundary>{children}</ErrorBoundary>
  );
}
