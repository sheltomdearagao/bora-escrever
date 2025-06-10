/**
 * Base API service with error handling and interceptors
 */

import {
  NetworkError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from '@/utils/error';
import { ERROR_MESSAGES } from '@/constants';

export interface ApiConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
  data?: unknown;
}

export class ApiService {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;
  private abortControllers: Map<string, AbortController>;

  constructor(config: ApiConfig = {}) {
    this.baseURL = config.baseURL || '';
    this.timeout = config.timeout || 30000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
    this.abortControllers = new Map();
  }

  /**
   * Set authorization token
   */
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Remove authorization token
   */
  removeAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  /**
   * Cancel a request
   */
  cancelRequest(requestId: string): void {
    const controller = this.abortControllers.get(requestId);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(requestId);
    }
  }

  /**
   * Cancel all requests
   */
  cancelAllRequests(): void {
    this.abortControllers.forEach((controller) => controller.abort());
    this.abortControllers.clear();
  }

  /**
   * Make HTTP request
   */
  private async request<T>(
    method: string,
    endpoint: string,
    options: {
      body?: unknown;
      headers?: Record<string, string>;
      params?: Record<string, string>;
      requestId?: string;
      signal?: AbortSignal;
    } = {}
  ): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.baseURL);

    // Add query parameters
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    // Create abort controller
    const abortController = new AbortController();
    const requestId = options.requestId || `${method}-${endpoint}-${Date.now()}`;
    this.abortControllers.set(requestId, abortController);

    // Set up timeout
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, this.timeout);

    try {
      const fetchOptions: RequestInit = {
        method,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
        signal: options.signal || abortController.signal,
      };

      if (options.body) {
        fetchOptions.body = JSON.stringify(options.body);
      }

      const response = await fetch(url.toString(), fetchOptions);

      clearTimeout(timeoutId);
      this.abortControllers.delete(requestId);

      // Handle response
      const data = await this.parseResponse<T>(response);

      if (!response.ok) {
        throw await this.handleErrorResponse(response, data);
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      this.abortControllers.delete(requestId);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new NetworkError('Request was cancelled', 0, 'Cancelled');
        }
        throw error;
      }

      throw new NetworkError(ERROR_MESSAGES.NETWORK);
    }
  }

  /**
   * Parse response data
   */
  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      return response.json() as Promise<T>;
    }

    if (contentType?.includes('text/')) {
      return response.text() as unknown as T;
    }

    return response.blob() as unknown as T;
  }

  /**
   * Handle error response
   */
  private async handleErrorResponse(response: Response, data: unknown): Promise<Error> {
    const errorMessage = this.extractErrorMessage(data);

    switch (response.status) {
      case 401:
        return new AuthenticationError(errorMessage || ERROR_MESSAGES.UNAUTHORIZED);
      case 403:
        return new AuthorizationError(errorMessage || ERROR_MESSAGES.UNAUTHORIZED);
      case 404:
        return new NotFoundError();
      case 400:
      case 422:
        return new Error(errorMessage || ERROR_MESSAGES.VALIDATION);
      default:
        return new NetworkError(
          errorMessage || ERROR_MESSAGES.API_ERROR,
          response.status,
          response.statusText,
          response.url
        );
    }
  }

  /**
   * Extract error message from response data
   */
  private extractErrorMessage(data: unknown): string | null {
    if (typeof data === 'string') return data;

    if (data && typeof data === 'object') {
      if ('message' in data && typeof data.message === 'string') {
        return data.message;
      }
      if ('error' in data && typeof data.error === 'string') {
        return data.error;
      }
      if ('errors' in data && Array.isArray(data.errors) && data.errors.length > 0) {
        return data.errors[0]?.message || data.errors[0];
      }
    }

    return null;
  }

  /**
   * GET request
   */
  async get<T>(
    endpoint: string,
    options?: {
      params?: Record<string, string>;
      headers?: Record<string, string>;
      requestId?: string;
      signal?: AbortSignal;
    }
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, options);
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: {
      params?: Record<string, string>;
      headers?: Record<string, string>;
      requestId?: string;
      signal?: AbortSignal;
    }
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, { ...options, body });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    body?: unknown,
    options?: {
      params?: Record<string, string>;
      headers?: Record<string, string>;
      requestId?: string;
      signal?: AbortSignal;
    }
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, { ...options, body });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    body?: unknown,
    options?: {
      params?: Record<string, string>;
      headers?: Record<string, string>;
      requestId?: string;
      signal?: AbortSignal;
    }
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, { ...options, body });
  }

  /**
   * DELETE request
   */
  async delete<T>(
    endpoint: string,
    options?: {
      params?: Record<string, string>;
      headers?: Record<string, string>;
      requestId?: string;
      signal?: AbortSignal;
    }
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, options);
  }
}

// Create default API instance
export const api = new ApiService({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 30000,
});

// Create internal API instance for Next.js API routes
export const internalApi = new ApiService({
  baseURL: '',
  timeout: 30000,
});
