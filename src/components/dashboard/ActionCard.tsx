'use client';

import { cn } from '@/lib/utils';
import { ReactNode, memo } from 'react';

interface ActionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  primary?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ActionCard = memo(function ActionCard({
  icon,
  title,
  description,
  primary = false,
  className,
  onClick,
  disabled = false,
}: ActionCardProps) {
  const baseClasses = cn(
    'action-card p-4 rounded-lg shadow-md transition-all duration-200',
    'hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2',
    primary
      ? 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500'
      : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring-blue-500',
    onClick && !disabled && 'cursor-pointer',
    disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
    className
  );

  const content = (
    <>
      <div className="action-card__icon text-2xl mb-2" aria-hidden="true">
        {icon}
      </div>
      <div className="action-card__content">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p
          className={cn(
            'text-sm',
            primary ? 'text-orange-100' : 'text-gray-500 dark:text-gray-400'
          )}
        >
          {description}
        </p>
      </div>
    </>
  );

  // If clickable, render as button
  if (onClick && !disabled) {
    return (
      <button
        className={baseClasses}
        onClick={onClick}
        type="button"
        aria-label={`${title}: ${description}`}
      >
        {content}
      </button>
    );
  }

  // If disabled but has onClick, render as disabled button
  if (onClick && disabled) {
    return (
      <button
        className={baseClasses}
        disabled
        type="button"
        aria-label={`${title}: ${description} (desabilitado)`}
      >
        {content}
      </button>
    );
  }

  // Otherwise render as div
  return <div className={baseClasses}>{content}</div>;
});

// Export for backward compatibility
export default ActionCard;
