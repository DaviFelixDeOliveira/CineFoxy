import React from 'react';
import { Skeleton } from './Skeleton';
import styles from './Skeleton.module.css';

export interface PosterSkeletonProps {
  className?: string;
}

export const PosterSkeleton: React.FC<PosterSkeletonProps> = ({ className }) => {
  return (
    <div className={`${styles.posterSkeleton} ${className || ''}`} aria-busy="true">
      <Skeleton className={styles.posterShape} />
      <div className={styles.metaSkeleton}>
        <Skeleton className={styles.titleLine} />
        <Skeleton className={styles.subLine} />
      </div>
    </div>
  );
};
