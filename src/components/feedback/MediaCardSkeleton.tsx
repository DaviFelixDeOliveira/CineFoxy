import React from 'react';
import { Skeleton } from './Skeleton';
import styles from './Skeleton.module.css';

export interface MediaCardSkeletonProps {
  className?: string;
}

export const MediaCardSkeleton: React.FC<MediaCardSkeletonProps> = ({ className }) => {
  return (
    <div className={`${styles.posterSkeleton} ${className || ''}`} aria-busy="true" aria-hidden="true">
      <Skeleton className={styles.posterShape} />
      <div className={styles.metaSkeleton}>
        <Skeleton className={styles.titleLine} />
        <div className={styles.metaRow}>
          <Skeleton className={styles.subLine} />
          <Skeleton className={styles.genreTagShape} />
        </div>
      </div>
    </div>
  );
};
