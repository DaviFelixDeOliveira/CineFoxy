import React from 'react';
import { Skeleton } from './Skeleton';
import styles from './Skeleton.module.css';

export interface ChannelSkeletonProps {
  className?: string;
}

export const ChannelSkeleton: React.FC<ChannelSkeletonProps> = ({ className }) => {
  return (
    <div className={`${styles.posterSkeleton} ${className || ''}`} aria-busy="true">
      <Skeleton className={styles.channelShape} />
      <div className={styles.metaSkeleton}>
        <Skeleton className={styles.titleLine} />
      </div>
    </div>
  );
};
