/**
 * Performance monitoring utilities
 */

export const performance = {
  /**
   * Mark a performance point
   */
  mark: (name: string): void => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
    }
  },

  /**
   * Measure performance between two marks
   */
  measure: (name: string, startMark: string, endMark?: string): number => {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        if (endMark) {
          window.performance.measure(name, startMark, endMark);
        } else {
          window.performance.measure(name, startMark);
        }
        const entries = window.performance.getEntriesByName(name, 'measure');
        const measure = entries[entries.length - 1];
        return measure ? measure.duration : 0;
      } catch (error) {
        console.error('Performance measurement error:', error);
        return 0;
      }
    }
    return 0;
  },

  /**
   * Clear performance marks
   */
  clearMarks: (name?: string): void => {
    if (typeof window !== 'undefined' && window.performance) {
      if (name) {
        window.performance.clearMarks(name);
      } else {
        window.performance.clearMarks();
      }
    }
  },

  /**
   * Clear performance measures
   */
  clearMeasures: (name?: string): void => {
    if (typeof window !== 'undefined' && window.performance) {
      if (name) {
        window.performance.clearMeasures(name);
      } else {
        window.performance.clearMeasures();
      }
    }
  },

  /**
   * Get navigation timing
   */
  getNavigationTiming: () => {
    if (typeof window !== 'undefined' && window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const navigationStart = timing.navigationStart;

      return {
        // Total page load time
        loadTime: timing.loadEventEnd - navigationStart,
        // Time to DOM ready
        domReadyTime: timing.domContentLoadedEventEnd - navigationStart,
        // Time to first byte
        ttfb: timing.responseStart - navigationStart,
        // DNS lookup time
        dnsTime: timing.domainLookupEnd - timing.domainLookupStart,
        // TCP connection time
        tcpTime: timing.connectEnd - timing.connectStart,
        // Request time
        requestTime: timing.responseEnd - timing.requestStart,
        // Response time
        responseTime: timing.responseEnd - timing.responseStart,
        // DOM processing time
        domProcessingTime: timing.domComplete - timing.domLoading,
      };
    }
    return null;
  },

  /**
   * Get resource timing
   */
  getResourceTiming: (type?: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      const entries = window.performance.getEntriesByType(
        'resource'
      ) as PerformanceResourceTiming[];

      if (type) {
        return entries.filter((entry) => entry.initiatorType === type);
      }

      return entries.map((entry) => ({
        name: entry.name,
        type: entry.initiatorType,
        duration: entry.duration,
        size: entry.transferSize,
        startTime: entry.startTime,
      }));
    }
    return [];
  },

  /**
   * Get memory usage (Chrome only)
   */
  getMemoryUsage: () => {
    if (typeof window !== 'undefined' && 'memory' in window.performance) {
      const memory = (
        window.performance as Performance & {
          memory: {
            usedJSHeapSize: number;
            totalJSHeapSize: number;
            jsHeapSizeLimit: number;
          };
        }
      ).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
        usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
      };
    }
    return null;
  },

  /**
   * Measure function execution time
   */
  measureFunction: async <T>(
    fn: () => T | Promise<T>,
    name: string
  ): Promise<{ result: T; duration: number }> => {
    const startTime = Date.now();

    try {
      const result = await fn();
      const duration = Date.now() - startTime;

      console.log(`[Performance] ${name} took ${duration}ms`);

      return { result, duration };
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[Performance] ${name} failed after ${duration}ms`, error);
      throw error;
    }
  },

  /**
   * Create a performance observer
   */
  observe: (
    types: string[],
    callback: (entries: PerformanceEntry[]) => void
  ): PerformanceObserver | null => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          callback(list.getEntries());
        });

        observer.observe({ entryTypes: types });
        return observer;
      } catch (error) {
        console.error('Failed to create PerformanceObserver:', error);
        return null;
      }
    }
    return null;
  },

  /**
   * Get FPS (Frames Per Second)
   */
  getFPS: (callback: (fps: number) => void): (() => void) => {
    let lastTime = window.performance.now();
    let frames = 0;
    let rafId: number;

    const tick = () => {
      frames++;
      const currentTime = window.performance.now();

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        callback(fps);
        frames = 0;
        lastTime = currentTime;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // Return cleanup function
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  },

  /**
   * Detect performance issues
   */
  detectIssues: () => {
    const issues: string[] = [];

    if (typeof window !== 'undefined' && window.performance) {
      // Check for slow page load
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;

      if (loadTime > 3000) {
        issues.push(`Slow page load: ${loadTime}ms`);
      }

      // Check for large resources
      const resources = window.performance.getEntriesByType(
        'resource'
      ) as PerformanceResourceTiming[];
      resources.forEach((resource) => {
        if (resource.duration > 1000) {
          issues.push(`Slow resource: ${resource.name} (${Math.round(resource.duration)}ms)`);
        }
        if (resource.transferSize > 1024 * 1024) {
          // 1MB
          issues.push(
            `Large resource: ${resource.name} (${Math.round(resource.transferSize / 1024)}KB)`
          );
        }
      });

      // Check memory usage (Chrome only)
      if ('memory' in window.performance) {
        const memory = (
          window.performance as Performance & {
            memory: {
              usedJSHeapSize: number;
              totalJSHeapSize: number;
              jsHeapSizeLimit: number;
            };
          }
        ).memory;
        const usagePercentage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

        if (usagePercentage > 90) {
          issues.push(`High memory usage: ${Math.round(usagePercentage)}%`);
        }
      }
    }

    return issues;
  },
};

/**
 * Web Vitals utilities
 */
export const webVitals = {
  /**
   * Get Largest Contentful Paint (LCP)
   */
  getLCP: (callback: (value: number) => void): void => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
            renderTime?: number;
            loadTime?: number;
          };
          callback(lastEntry.renderTime || lastEntry.loadTime || 0);
        });

        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.error('LCP observation failed:', error);
      }
    }
  },

  /**
   * Get First Input Delay (FID)
   */
  getFID: (callback: (value: number) => void): void => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fidEntry = entry as PerformanceEntry & {
              processingStart: number;
              startTime: number;
            };
            callback(fidEntry.processingStart - fidEntry.startTime);
          });
        });

        observer.observe({ entryTypes: ['first-input'] });
      } catch (error) {
        console.error('FID observation failed:', error);
      }
    }
  },

  /**
   * Get Cumulative Layout Shift (CLS)
   */
  getCLS: (callback: (value: number) => void): void => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      let clsValue = 0;

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & {
            hadRecentInput: boolean;
            value: number;
          };
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
        callback(clsValue);
      });

      try {
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.error('CLS observation failed:', error);
      }
    }
  },
};
