/**
 * Async operation hooks for React
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

/**
 * Hook for managing async operations
 */
export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: false,
    isIdle: true,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState({
      data: null,
      error: null,
      loading: true,
      isIdle: false,
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    try {
      const data = await asyncFunction();

      if (isMountedRef.current) {
        setState({
          data,
          error: null,
          loading: false,
          isIdle: false,
          isLoading: false,
          isSuccess: true,
          isError: false,
        });
      }

      return data;
    } catch (error) {
      if (isMountedRef.current) {
        setState({
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
          loading: false,
          isIdle: false,
          isLoading: false,
          isSuccess: false,
          isError: true,
        });
      }
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      loading: false,
      isIdle: true,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

/**
 * Hook for fetching data on mount
 */
export function useFetch<T>(
  url: string,
  options?: RequestInit
): AsyncState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: true,
    isIdle: false,
    isLoading: true,
    isSuccess: false,
    isError: false,
  });

  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setState((prev) => ({
      ...prev,
      loading: true,
      isLoading: true,
      isError: false,
    }));

    try {
      const response = await fetch(url, {
        ...options,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as T;

      if (isMountedRef.current) {
        setState({
          data,
          error: null,
          loading: false,
          isIdle: false,
          isLoading: false,
          isSuccess: true,
          isError: false,
        });
      }
    } catch (error) {
      if (isMountedRef.current && error instanceof Error && error.name !== 'AbortError') {
        setState({
          data: null,
          error,
          loading: false,
          isIdle: false,
          isLoading: false,
          isSuccess: false,
          isError: true,
        });
      }
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}

/**
 * Hook for lazy async operations
 */
export function useLazyAsync<T, Args extends unknown[] = []>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: false,
    isIdle: true,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const isMountedRef = useRef(true);
  const promiseRef = useRef<Promise<T> | null>(null);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (asyncFunction: (...args: Args) => Promise<T>, ...args: Args): Promise<T> => {
      setState({
        data: null,
        error: null,
        loading: true,
        isIdle: false,
        isLoading: true,
        isSuccess: false,
        isError: false,
      });

      try {
        promiseRef.current = asyncFunction(...args);
        const data = await promiseRef.current;

        if (isMountedRef.current) {
          setState({
            data,
            error: null,
            loading: false,
            isIdle: false,
            isLoading: false,
            isSuccess: true,
            isError: false,
          });
        }

        return data;
      } catch (error) {
        if (isMountedRef.current) {
          setState({
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            loading: false,
            isIdle: false,
            isLoading: false,
            isSuccess: false,
            isError: true,
          });
        }
        throw error;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      loading: false,
      isIdle: true,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
    promiseRef.current = null;
  }, []);

  return {
    ...state,
    execute,
    reset,
    promise: promiseRef.current,
  };
}

/**
 * Hook for polling data
 */
export function usePolling<T>(
  asyncFunction: () => Promise<T>,
  interval: number,
  enabled = true
): AsyncState<T> & { start: () => void; stop: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: false,
    isIdle: true,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const poll = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
      isLoading: true,
    }));

    try {
      const data = await asyncFunction();

      if (isMountedRef.current) {
        setState({
          data,
          error: null,
          loading: false,
          isIdle: false,
          isLoading: false,
          isSuccess: true,
          isError: false,
        });
      }
    } catch (error) {
      if (isMountedRef.current) {
        setState({
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
          loading: false,
          isIdle: false,
          isLoading: false,
          isSuccess: false,
          isError: true,
        });
      }
    }
  }, [asyncFunction]);

  const start = useCallback(() => {
    if (intervalRef.current) return;

    poll(); // Initial poll
    intervalRef.current = setInterval(poll, interval);
  }, [poll, interval]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      start();
    } else {
      stop();
    }

    return () => {
      isMountedRef.current = false;
      stop();
    };
  }, [enabled, start, stop]);

  return {
    ...state,
    start,
    stop,
  };
}
