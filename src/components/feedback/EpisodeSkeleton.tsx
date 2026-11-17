import React from 'react';
import { Skeleton } from './Skeleton';
import styles from './EpisodeSkeleton.module.css';

export interface EpisodeSkeletonProps {
  className?: string;
}

export const EpisodeSkeleton: React.FC<EpisodeSkeletonProps> = ({ className }) => {
  return (
    <div className={`${styles.episode} ${className || ''}`} aria-busy="true" aria-hidden="true">
      <div className={styles.thumbBox}>
        <Skeleton className={styles.thumb} />
      </div>
      <div className={styles.content}>
        <div className={styles.topRow}>
          <Skeleton className={styles.title} />
          <Skeleton className={styles.duration} />
        </div>
        <Skeleton className={styles.synopsis1} />
        <Skeleton className={styles.synopsis2} />
      </div>
    </div>
  );
};
