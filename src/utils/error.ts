/**
 * Error handling and logging utilities
 */

import { STORAGE_KEYS } from '@/constants';

interface ErrorInfo {
  message: string;
  stack?: string;
  context?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  componentStack?: string;
  errorBoundary?: boolean;
  errorBoundaryProps?: Record<string, unknown>;
  additionalData?: Record<string, unknown>;
}

interface ErrorLog {
  id: string;
  error: ErrorInfo;
  count: number;
  firstOccurrence: string;
  lastOccurrence: string;
}

/**
 * Error logging utility
 */
export function logError(
  error: Error | string,
  context?: string,
  additionalData?: Record<string, unknown>
): void {
  const errorInfo: ErrorInfo = {
    message: typeof error === 'string' ? error : error.message,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
    url: typeof window !== 'undefined' ? window.location.href : 'server',
    ...(typeof error === 'object' && error.stack ? { stack: error.stack } : {}),
    ...(context ? { context } : {}),
    ...(additionalData ? { additionalData } : {}),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Application Error:', errorInfo);
  }

  // Store error locally for debugging
  storeErrorLog(errorInfo);

  // In production, send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    sendToErrorService(errorInfo);
  }
}

/**
 * Store error log in localStorage for debugging
 */
function storeErrorLog(errorInfo: ErrorInfo): void {
  if (typeof window === 'undefined') return;

  try {
    const errorLogsKey = `${STORAGE_KEYS.USER_PREFERENCES}_error_logs`;
    const existingLogs = localStorage.getItem(errorLogsKey);
    const logs: ErrorLog[] = existingLogs ? JSON.parse(existingLogs) : [];

    // Check if similar error already exists
    const existingErrorIndex = logs.findIndex(
      (log) => log.error.message === errorInfo.message && log.error.stack === errorInfo.stack
    );

    if (existingErrorIndex !== -1) {
      // Update existing error
      logs[existingErrorIndex]!.count++;
      logs[existingErrorIndex]!.lastOccurrence = errorInfo.timestamp;
    } else {
      // Add new error
      const newLog: ErrorLog = {
        id: generateErrorId(),
        error: errorInfo,
        count: 1,
        firstOccurrence: errorInfo.timestamp,
        lastOccurrence: errorInfo.timestamp,
      };
      logs.push(newLog);
    }

    // Keep only last 50 errors
    const recentLogs = logs.slice(-50);
    localStorage.setItem(errorLogsKey, JSON.stringify(recentLogs));
  } catch (e) {
    console.error('Failed to store error log:', e);
  }
}

/**
 * Send error to external service (e.g., Sentry, LogRocket)
 */
async function sendToErrorService(errorInfo: ErrorInfo): Promise<void> {
  try {
    // Example: Send to your error tracking endpoint
    const response = await fetch('/api/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorInfo),
    });

    if (!response.ok) {
      console.error('Failed to send error to service:', response.statusText);
    }
  } catch (e) {
    console.error('Failed to send error to service:', e);
  }
}

/**
 * Generate unique error ID
 */
function generateErrorId(): string {
  return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get stored error logs
 */
export function getErrorLogs(): ErrorLog[] {
  if (typeof window === 'undefined') return [];

  try {
    const errorLogsKey = `${STORAGE_KEYS.USER_PREFERENCES}_error_logs`;
    const logs = localStorage.getItem(errorLogsKey);
    return logs ? JSON.parse(logs) : [];
  } catch (e) {
    console.error('Failed to get error logs:', e);
    return [];
  }
}

/**
 * Clear error logs
 */
export function clearErrorLogs(): void {
  if (typeof window === 'undefined') return;

  try {
    const errorLogsKey = `${STORAGE_KEYS.USER_PREFERENCES}_error_logs`;
    localStorage.removeItem(errorLogsKey);
  } catch (e) {
    console.error('Failed to clear error logs:', e);
  }
}

/**
 * Create custom error classes
 */
export class AppError extends Error {
  public readonly timestamp: Date;
  public readonly context?: string;
  public readonly code?: string;

  constructor(message: string, context?: string, code?: string) {
    super(message);
    this.name = 'AppError';
    this.timestamp = new Date();
    if (context !== undefined) this.context = context;
    if (code !== undefined) this.code = code;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  public readonly field?: string;
  public readonly value?: unknown;

  constructor(message: string, field?: string, value?: unknown) {
    super(message, 'validation');
    this.name = 'ValidationError';
    if (field !== undefined) this.field = field;
    if (value !== undefined) this.value = value;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NetworkError extends AppError {
  public readonly status?: number;
  public readonly statusText?: string;
  public readonly url?: string;

  constructor(message: string, status?: number, statusText?: string, url?: string) {
    super(message, 'network');
    this.name = 'NetworkError';
    if (status !== undefined) this.status = status;
    if (statusText !== undefined) this.statusText = statusText;
    if (url !== undefined) this.url = url;
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'authentication', 'AUTH_REQUIRED');
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'authorization', 'INSUFFICIENT_PERMISSIONS');
    this.name = 'AuthorizationError';
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

export class NotFoundError extends AppError {
  public readonly resource?: string;

  constructor(resource?: string) {
    const message = resource ? `${resource} not found` : 'Resource not found';
    super(message, 'not_found', 'NOT_FOUND');
    this.name = 'NotFoundError';
    if (resource !== undefined) this.resource = resource;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Format error for display
 */
export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return 'An unknown error occurred';
}

/**
 * Check if error is of specific type
 */
export function isErrorType<T extends Error>(
  error: unknown,
  errorClass: new (...args: unknown[]) => T
): error is T {
  return error instanceof errorClass;
}

/**
 * Retry on error with exponential backoff
 */
export async function retryOnError<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffFactor?: number;
    shouldRetry?: (error: unknown, attempt: number) => boolean;
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    backoffFactor = 2,
    shouldRetry = () => true,
  } = options;

  let lastError: unknown;
  let delay = initialDelay;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts || !shouldRetry(error, attempt)) {
        throw error;
      }

      logError(error instanceof Error ? error : new Error(String(error)), 'retryOnError', {
        attempt,
        delay,
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = Math.min(delay * backoffFactor, maxDelay);
    }
  }

  throw lastError;
}
