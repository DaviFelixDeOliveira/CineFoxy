import React from 'react';
import { Skeleton } from './Skeleton';
import styles from './CategoryCardSkeleton.module.css';

export interface CategoryCardSkeletonProps {
  className?: string;
}

export const CategoryCardSkeleton: React.FC<CategoryCardSkeletonProps> = ({ className }) => {
  return (
    <div className={`${styles.card} ${className || ''}`} aria-busy="true" aria-hidden="true">
      <div className={styles.accentBar} />
      <div className={styles.content}>
        <Skeleton className={styles.pill} />
        <Skeleton className={styles.title} />
        <Skeleton className={styles.desc1} />
        <Skeleton className={styles.desc2} />
      </div>
    </div>
  );
};
