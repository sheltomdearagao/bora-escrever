'use client';

import { cn } from '@/lib/utils';
import { ReactNode, memo } from 'react';

interface StatCardProps {
  icon: ReactNode;
  number: string | number;
  label: string;
  className?: string;
  onClick?: () => void;
}

export const StatCard = memo(function StatCard({
  icon,
  number,
  label,
  className,
  onClick,
}: StatCardProps) {
  const baseClasses = cn(
    'stat-card bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4',
    'transition-all duration-200 hover:shadow-lg hover:scale-105',
    'dark:text-white',
    onClick && 'cursor-pointer',
    className
  );

  // Render as button if clickable
  if (onClick) {
    return (
      <button className={baseClasses} onClick={onClick} type="button">
        <div
          className="stat-card__icon text-2xl text-blue-600 dark:text-blue-400"
          aria-hidden="true"
        >
          {icon}
        </div>
        <div className="stat-card__content text-left">
          <div className="stat-card__number text-2xl font-bold text-gray-900 dark:text-gray-100">
            {number}
          </div>
          <div className="stat-card__label text-gray-500 dark:text-gray-400">{label}</div>
        </div>
      </button>
    );
  }

  // Render as div if not clickable
  return (
    <div className={baseClasses}>
      <div className="stat-card__icon text-2xl text-blue-600 dark:text-blue-400" aria-hidden="true">
        {icon}
      </div>
      <div className="stat-card__content">
        <div className="stat-card__number text-2xl font-bold text-gray-900 dark:text-gray-100">
          {number}
        </div>
        <div className="stat-card__label text-gray-500 dark:text-gray-400">{label}</div>
      </div>
    </div>
  );
});

// Export for backward compatibility
export default StatCard;
