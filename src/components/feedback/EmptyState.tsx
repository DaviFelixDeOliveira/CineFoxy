import React from 'react';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`} role="region" aria-label={title}>
      {icon && <div className={styles.iconWrapper}>{icon}</div>}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
