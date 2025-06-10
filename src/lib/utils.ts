/**
 * Re-export utilities from the new modular structure
 * This file maintains backward compatibility
 */

// Re-export all utilities
export * from '@/utils';

// Legacy exports for backward compatibility
export { cn } from '@/utils/helpers';
export { formatDate, formatDateTime } from '@/utils/formatters/date';
export { truncateText, capitalizeWords } from '@/utils/formatters/string';
export { isValidEmail } from '@/utils/validators';
export { storage } from '@/utils/storage';
export { performance } from '@/utils/performance';
export { logError, retryOnError } from '@/utils/error';
// Alias for backward compatibility
export { retryOnError as retry } from '@/utils/error';
