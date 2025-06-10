'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

// Error types for better categorization
export enum ErrorType {
  NETWORK = 'NETWORK',
  PERMISSION = 'PERMISSION',
  VALIDATION = 'VALIDATION',
  UNKNOWN = 'UNKNOWN',
}

// Error categorization helper
function categorizeError(error: Error): ErrorType {
  const message = error.message.toLowerCase();

  if (message.includes('network') || message.includes('fetch') || message.includes('api')) {
    return ErrorType.NETWORK;
  }
  if (
    message.includes('permission') ||
    message.includes('unauthorized') ||
    message.includes('forbidden')
  ) {
    return ErrorType.PERMISSION;
  }
  if (message.includes('validation') || message.includes('invalid')) {
    return ErrorType.VALIDATION;
  }

  return ErrorType.UNKNOWN;
}

// Error storage interface for flexibility
interface StoredError {
  message: string;
  stack: string;
  // componentStack is always a string (empty if not present)
  componentStack: string;
  timestamp: string;
  userAgent: string;
  url: string;
}

interface ErrorStorage {
  saveError(errorData: StoredError): Promise<void> | void;
  getErrors(): Promise<StoredError[]> | StoredError[];
}

// In-memory storage implementation
class MemoryErrorStorage implements ErrorStorage {
  private errors: StoredError[] = [];
  private maxErrors = 50;

  saveError(errorData: StoredError): void {
    this.errors.push(errorData);
    if (this.errors.length > this.maxErrors) {
      this.errors.splice(0, this.errors.length - this.maxErrors);
    }
  }

  getErrors(): StoredError[] {
    return [...this.errors];
  }
}

// Browser storage implementation with fallback
class BrowserErrorStorage implements ErrorStorage {
  private fallbackStorage = new MemoryErrorStorage();
  private storageKey = 'app_errors';
  private maxErrors = 50;

  private isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  saveError(errorData: StoredError): void {
    if (this.isStorageAvailable()) {
      try {
        const errors: StoredError[] = JSON.parse(window.localStorage.getItem(this.storageKey) || '[]');
        errors.push(errorData);
        if (errors.length > this.maxErrors) {
          errors.splice(0, errors.length - this.maxErrors);
        }
        window.localStorage.setItem(this.storageKey, JSON.stringify(errors));
      } catch (error) {
        console.warn('Failed to save error to localStorage, using memory storage:', error);
        this.fallbackStorage.saveError(errorData);
      }
    } else {
      this.fallbackStorage.saveError(errorData);
    }
  }

  getErrors(): StoredError[] {
    if (this.isStorageAvailable()) {
      try {
        return JSON.parse(window.localStorage.getItem(this.storageKey) || '[]');
      } catch (error) {
        console.warn('Failed to read errors from localStorage, using memory storage:', error);
        return this.fallbackStorage.getErrors();
      }
    } else {
      return this.fallbackStorage.getErrors();
    }
  }
}

// Error logger service
class ErrorLogger {
  private static instance: ErrorLogger;
  private errorQueue: Array<{ error: Error; errorInfo?: ErrorInfo; timestamp: Date }> = [];
  private isProduction = process.env.NODE_ENV === 'production';
  private storage: ErrorStorage;

  constructor() {
    // Use browser storage in browser environment, memory storage otherwise
    this.storage = typeof window !== 'undefined' 
      ? new BrowserErrorStorage() 
      : new MemoryErrorStorage();
  }

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  logError(error: Error, errorInfo?: ErrorInfo): void {
    const errorEntry = {
      error,
      // Only add errorInfo if defined
      ...(errorInfo !== undefined ? { errorInfo } : {}),
      timestamp: new Date(),
    };
    this.errorQueue.push(errorEntry);

    // In development, log to console
    if (!this.isProduction) {
      console.error('Error logged:', errorEntry);
    }

    // In production, send to error tracking service
    if (this.isProduction) {
      this.sendToErrorService(errorEntry);
    }
  }

  private sendToErrorService(errorEntry: { error: Error; errorInfo?: ErrorInfo; timestamp: Date }): void {
    // Store error data
    const errorData: StoredError = {
      message: errorEntry.error.message,
      stack: errorEntry.error.stack || '',
      componentStack: errorEntry.errorInfo?.componentStack || '',
      timestamp: errorEntry.timestamp.toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    };
    try {
      this.storage.saveError(errorData);
    } catch (error) {
      console.error('Failed to store error:', error);
    }

    // TODO: Integrate with external error tracking service (e.g., Sentry, LogRocket)
    // Example:
    // Sentry.captureException(errorEntry.error, {
    //   contexts: {
    //     react: {
    //       componentStack: errorEntry.errorInfo?.componentStack,
    //     },
    //   },
    // });
  }

  getRecentErrors(): Array<{ error: Error; errorInfo?: ErrorInfo; timestamp: Date }> {
    return this.errorQueue.slice(-10);
  }

  // Method to get stored errors (useful for debugging)
  getStoredErrors(): StoredError[] {
    try {
      const errors = this.storage.getErrors();
      if (Array.isArray(errors)) return errors;
      return [];
    } catch (error) {
      console.error('Failed to retrieve stored errors:', error);
      return [];
    }
  }
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | undefined;
  errorInfo?: ErrorInfo;
  errorType?: ErrorType;
  retryCount: number;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<{
    error?: Error;
    errorType?: ErrorType;
    resetError: () => void;
    navigateHome: () => void;
  }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  maxRetries?: number;
  enableLogging?: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private logger = ErrorLogger.getInstance();

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorType = categorizeError(error);
    return {
      hasError: true,
      error,
      errorType,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error only if logging is enabled (default: true)
    if (this.props.enableLogging !== false) {
      this.logger.logError(error, errorInfo);
    }

    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = (): void => {
    const maxRetries = this.props.maxRetries || 3;

    if (this.state.retryCount < maxRetries) {
      this.setState((prevState) => ({
        hasError: false,
        error: undefined,
        retryCount: prevState.retryCount + 1,
      }));
    } else {
      // If max retries reached, show a different message
      this.setState({
        error: new Error('Número máximo de tentativas atingido. Por favor, recarregue a página.'),
        errorType: ErrorType.UNKNOWN,
      });
    }
  };

  navigateHome = (): void => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  private getErrorTitle(): string {
    switch (this.state.errorType) {
      case ErrorType.NETWORK:
        return 'Erro de Conexão';
      case ErrorType.PERMISSION:
        return 'Acesso Negado';
      case ErrorType.VALIDATION:
        return 'Dados Inválidos';
      default:
        return 'Algo deu errado';
    }
  }

  private getErrorDescription(): string {
    switch (this.state.errorType) {
      case ErrorType.NETWORK:
        return 'Verifique sua conexão com a internet e tente novamente.';
      case ErrorType.PERMISSION:
        return 'Você não tem permissão para acessar este recurso.';
      case ErrorType.VALIDATION:
        return 'Os dados fornecidos são inválidos. Por favor, verifique e tente novamente.';
      default:
        return 'Ocorreu um erro inesperado. Por favor, tente novamente.';
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        // Only pass error and errorType if they are defined
        const fallbackProps: {
          resetError: () => void;
          navigateHome: () => void;
          error?: Error;
          errorType?: ErrorType;
        } = {
          resetError: this.resetError,
          navigateHome: this.navigateHome,
        };
        if (this.state.error) fallbackProps.error = this.state.error;
        if (this.state.errorType) fallbackProps.errorType = this.state.errorType;
        return <FallbackComponent {...fallbackProps} />;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            {/* Error Icon */}
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>

            {/* Error Title */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-2">
              {this.getErrorTitle()}
            </h2>

            {/* Error Description */}
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              {this.getErrorDescription()}
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre className="whitespace-pre-wrap text-red-600 dark:text-red-400 text-xs overflow-auto max-h-32">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack && '\n\nComponent Stack:'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            {/* Retry Information */}
            {this.state.retryCount > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
                Tentativa {this.state.retryCount} de {this.props.maxRetries || 3}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.resetError}
                disabled={this.state.retryCount >= (this.props.maxRetries || 3)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <RefreshCw className="w-4 h-4" />
                Tentar novamente
              </button>

              <button
                onClick={this.navigateHome}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <Home className="w-4 h-4" />
                Página inicial
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components to handle errors
export function useErrorHandler() {
  const logger = ErrorLogger.getInstance();

  return React.useCallback(
    (error: Error, errorInfo?: React.ErrorInfo) => {
      logger.logError(error, errorInfo);
    },
    [logger]
  );
}

// Simple error fallback component
export function SimpleErrorFallback({
  error,
  resetError,
}: {
  error?: Error;
  resetError: () => void;
}) {
  return (
    <div className="text-center p-8">
      <h2 className="text-xl font-semibold text-red-600 mb-4">Erro na aplicação</h2>
      <p className="text-gray-600 mb-4">{error?.message || 'Ocorreu um erro inesperado'}</p>
      <button
        onClick={resetError}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Tentar novamente
      </button>
    </div>
  );
}

export default ErrorBoundary;