/**
 * Local storage utilities with error handling
 */

export const storage = {
  /**
   * Get item from localStorage
   */
  get: <T = unknown>(key: string): T | null => {
    try {
      if (typeof window === 'undefined') return null;
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  /**
   * Set item in localStorage
   */
  set: (key: string, value: unknown): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   */
  remove: (key: string): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  /**
   * Clear all items from localStorage
   */
  clear: (): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  /**
   * Get all keys from localStorage
   */
  keys: (): string[] => {
    try {
      if (typeof window === 'undefined') return [];
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Error getting localStorage keys:', error);
      return [];
    }
  },

  /**
   * Check if key exists in localStorage
   */
  has: (key: string): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error('Error checking localStorage key:', error);
      return false;
    }
  },

  /**
   * Get storage size in bytes
   */
  size: (): number => {
    try {
      if (typeof window === 'undefined') return 0;
      let size = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          size += localStorage[key].length + key.length;
        }
      }
      return size * 2; // UTF-16 uses 2 bytes per character
    } catch (error) {
      console.error('Error calculating localStorage size:', error);
      return 0;
    }
  },
};

/**
 * Session storage utilities
 */
export const sessionStorage = {
  /**
   * Get item from sessionStorage
   */
  get: <T = unknown>(key: string): T | null => {
    try {
      if (typeof window === 'undefined') return null;
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return null;
    }
  },

  /**
   * Set item in sessionStorage
   */
  set: (key: string, value: unknown): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to sessionStorage:', error);
      return false;
    }
  },

  /**
   * Remove item from sessionStorage
   */
  remove: (key: string): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
      return false;
    }
  },

  /**
   * Clear all items from sessionStorage
   */
  clear: (): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
      return false;
    }
  },
};

/**
 * Cookie utilities
 */
export const cookies = {
  /**
   * Get cookie value
   */
  get: (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  },

  /**
   * Set cookie
   */
  set: (
    name: string,
    value: string,
    options: {
      days?: number;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: 'Strict' | 'Lax' | 'None';
    } = {}
  ): void => {
    if (typeof document === 'undefined') return;

    const { days = 7, path = '/', domain, secure = true, sameSite = 'Lax' } = options;

    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;

    let cookieString = `${name}=${value}; ${expires}; path=${path}`;
    if (domain) cookieString += `; domain=${domain}`;
    if (secure) cookieString += '; secure';
    cookieString += `; SameSite=${sameSite}`;

    document.cookie = cookieString;
  },

  /**
   * Remove cookie
   */
  remove: (name: string, path = '/'): void => {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
  },
};
