import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'primary' | 'neutral' | 'live' | 'success';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  withPulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  withPulse = false,
  className,
  ...props
}) => {
  const classNames = [styles.badge, styles[variant], className || ''].filter(Boolean).join(' ');

  return (
    <span className={classNames} {...props}>
      {withPulse && <span className={styles.pulse} aria-hidden="true" />}
      {children}
    </span>
  );
};
