import React from 'react';
import { Skeleton } from './Skeleton';
import styles from './TextSkeleton.module.css';

export type TextSkeletonVariant = 'title' | 'subtitle' | 'body' | 'caption';

export interface TextSkeletonProps {
  lines?: number;
  variant?: TextSkeletonVariant;
  widths?: string[];
  className?: string;
}

const DEFAULT_WIDTHS: Record<TextSkeletonVariant, string[]> = {
  title: ['260px'],
  subtitle: ['360px'],
  body: ['100%', '92%', '68%'],
  caption: ['140px']
};

export const TextSkeleton: React.FC<TextSkeletonProps> = ({
  lines,
  variant = 'body',
  widths,
  className
}) => {
  const defaultList = DEFAULT_WIDTHS[variant];
  const lineCount = lines ?? (variant === 'body' ? 2 : 1);

  return (
    <div className={`${styles.stack} ${className || ''}`} aria-hidden="true">
      {Array.from({ length: lineCount }).map((_, index) => {
        const width =
          widths?.[index] ||
          defaultList[index % defaultList.length] ||
          (index === lineCount - 1 && lineCount > 1 ? '65%' : '100%');

        return (
          <Skeleton
            key={`text-skel-${index}`}
            className={`${styles.line} ${styles[variant]}`}
            style={{ width }}
          />
        );
      })}
    </div>
  );
};
