import React from 'react';
import { Skeleton } from './Skeleton';
import styles from './ChannelSkeleton.module.css';

export interface ChannelSkeletonProps {
  className?: string;
}

export const ChannelSkeleton: React.FC<ChannelSkeletonProps> = ({ className }) => {
  return (
    <div className={`${styles.card} ${className || ''}`} aria-busy="true" aria-hidden="true">
      <div className={styles.thumbWrapper}>
        <Skeleton className={styles.liveBadgeShape} />
        <Skeleton className={styles.logoShape} />
      </div>
      <div className={styles.info}>
        <Skeleton className={styles.nameShape} />
        <Skeleton className={styles.programShape} />
      </div>
    </div>
  );
};
