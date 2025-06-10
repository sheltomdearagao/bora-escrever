/**
 * Local storage hook for React
 */

import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/utils/storage';

/**
 * Hook for managing localStorage with React state
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storage.get<T>(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      storage.set(key, storedValue);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      storage.remove(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for syncing localStorage across tabs/windows
 */
export function useSyncedLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [value, setValue, removeValue] = useLocalStorage(key, initialValue);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue) as T;
          setValue(newValue);
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      } else if (e.key === key && e.newValue === null) {
        setValue(initialValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue, setValue]);

  return [value, setValue, removeValue];
}

/**
 * Hook for managing multiple localStorage values
 */
export function useLocalStorageState<T extends Record<string, unknown>>(
  prefix: string,
  initialState: T
): {
  state: T;
  setState: (updates: Partial<T>) => void;
  resetState: () => void;
  clearState: () => void;
} {
  const [state, setState] = useState<T>(() => {
    const storedState: Partial<T> = {};

    // Load all values with the prefix
    Object.keys(initialState).forEach((key) => {
      const storageKey = `${prefix}_${key}`;
      const value = storage.get(storageKey);
      if (value !== null) {
        storedState[key as keyof T] = value as T[keyof T];
      }
    });

    return { ...initialState, ...storedState };
  });

  // Update localStorage when state changes
  useEffect(() => {
    Object.entries(state).forEach(([key, value]) => {
      const storageKey = `${prefix}_${key}`;
      storage.set(storageKey, value);
    });
  }, [prefix, state]);

  const updateState = useCallback((updates: Partial<T>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  const clearState = useCallback(() => {
    Object.keys(state).forEach((key) => {
      const storageKey = `${prefix}_${key}`;
      storage.remove(storageKey);
    });
    setState(initialState);
  }, [prefix, state, initialState]);

  return {
    state,
    setState: updateState,
    resetState,
    clearState,
  };
}
