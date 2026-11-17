import React from 'react';
import { Skeleton } from './Skeleton';
import styles from './ContinueWatchingSkeleton.module.css';

export interface ContinueWatchingSkeletonProps {
  className?: string;
}

export const ContinueWatchingSkeleton: React.FC<ContinueWatchingSkeletonProps> = ({ className }) => {
  return (
    <div className={`${styles.card} ${className || ''}`} aria-busy="true" aria-hidden="true">
      <div className={styles.thumbWrapper}>
        <Skeleton className={styles.thumbShape} />
      </div>
      <div className={styles.info}>
        <Skeleton className={styles.titleShape} />
        <Skeleton className={styles.metaShape} />
      </div>
    </div>
  );
};

export interface ContinueWatchingSectionSkeletonProps {
  count?: number;
  className?: string;
}

export const ContinueWatchingSectionSkeleton: React.FC<ContinueWatchingSectionSkeletonProps> = ({
  count = 3,
  className
}) => {
  return (
    <section className={`${styles.section} ${className || ''}`} aria-busy="true" aria-hidden="true">
      <div className={styles.header}>
        <Skeleton className={styles.sectionTitle} />
      </div>
      <div className={styles.grid}>
        {Array.from({ length: count }).map((_, index) => (
          <ContinueWatchingSkeleton key={`cw-skel-${index}`} />
        ))}
      </div>
    </section>
  );
};
