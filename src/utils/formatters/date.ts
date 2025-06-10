/**
 * Date formatting utilities
 */

/**
 * Format date to Brazilian format (DD/MM/YYYY)
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date provided to formatDate:', date);
    return '';
  }

  return dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Format date with time to Brazilian format (DD/MM/YYYY HH:mm)
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date provided to formatDateTime:', date);
    return '';
  }

  return dateObj.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format relative time (e.g., "2 hours ago", "in 3 days")
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 0) {
    // Future dates
    const futureDiffInSeconds = Math.abs(diffInSeconds);
    const futureDiffInMinutes = Math.floor(futureDiffInSeconds / 60);
    const futureDiffInHours = Math.floor(futureDiffInMinutes / 60);
    const futureDiffInDays = Math.floor(futureDiffInHours / 24);

    if (futureDiffInDays > 0) {
      return `em ${futureDiffInDays} dia${futureDiffInDays > 1 ? 's' : ''}`;
    }
    if (futureDiffInHours > 0) {
      return `em ${futureDiffInHours} hora${futureDiffInHours > 1 ? 's' : ''}`;
    }
    if (futureDiffInMinutes > 0) {
      return `em ${futureDiffInMinutes} minuto${futureDiffInMinutes > 1 ? 's' : ''}`;
    }
    return 'em breve';
  }

  // Past dates
  if (diffInDays > 0) {
    return `há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
  }
  if (diffInHours > 0) {
    return `há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  }
  if (diffInMinutes > 0) {
    return `há ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
  }
  if (diffInSeconds > 0) {
    return `há ${diffInSeconds} segundo${diffInSeconds > 1 ? 's' : ''}`;
  }
  return 'agora';
}

/**
 * Get time of day greeting
 */
export function getTimeGreeting(): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'Bom dia';
  }
  if (hour >= 12 && hour < 18) {
    return 'Boa tarde';
  }
  return 'Boa noite';
}

/**
 * Format duration in milliseconds to human-readable format
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}
