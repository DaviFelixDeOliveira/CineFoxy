import React from 'react';
import type { AppError } from '@/types/error';
import { Button } from '@/components/ui/Button';
import styles from './ErrorState.module.css';

export interface ErrorStateProps {
  error: AppError;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry, className }) => {
  return (
    <div
      className={`${styles.container} ${className || ''}`}
      role="alert"
      aria-live="assertive"
    >
      <div className={styles.iconWrapper}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h2 className={styles.title}>Não foi possível carregar o conteúdo</h2>
      <p className={styles.message}>{error.userMessage}</p>

      {error.canRetry && onRetry && (
        <Button variant="primary" onClick={onRetry}>
          {error.actionLabel || 'Tentar novamente'}
        </Button>
      )}
    </div>
  );
};
