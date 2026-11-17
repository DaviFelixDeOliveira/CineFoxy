import React from 'react';
import { Skeleton } from './Skeleton';
import { PosterSkeleton } from './PosterSkeleton';
import styles from './MediaRowSkeleton.module.css';

export interface MediaRowSkeletonProps {
  className?: string;
  itemCount?: number;
}

export const MediaRowSkeleton: React.FC<MediaRowSkeletonProps> = ({
  className,
  itemCount = 5
}) => {
  return (
    <div className={`${styles.rowContainer} ${className || ''}`} aria-busy="true">
      <div className={styles.headerSkeleton}>
        <Skeleton className={styles.titleShape} />
        <Skeleton className={styles.descShape} />
      </div>

      <div className={styles.scrollArea}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <div key={`row-skel-${index}`} className={styles.itemWrapper}>
            <PosterSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};
