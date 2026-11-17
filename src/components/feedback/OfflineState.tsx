import React from 'react';
import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import styles from './OfflineState.module.css';

export interface OfflineStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const OfflineState: React.FC<OfflineStateProps> = ({
  title = 'Você está sem conexão',
  description = 'Verifique seu acesso à internet para carregar o catálogo atualizado e tente novamente.',
  onRetry,
  className
}) => {
  return (
    <div
      className={`${styles.container} ${className || ''}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.iconWrapper} aria-hidden="true">
        <WifiOff size={32} />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
};
