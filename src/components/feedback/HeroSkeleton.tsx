import React from 'react';
import { Skeleton } from './Skeleton';
import styles from './HeroSkeleton.module.css';

export interface HeroSkeletonProps {
  className?: string;
}

export const HeroSkeleton: React.FC<HeroSkeletonProps> = ({ className }) => {
  return (
    <div className={`${styles.heroSkeleton} ${className || ''}`} aria-busy="true">
      <div className={styles.contentWrapper}>
        <Skeleton className={styles.badgeShape} />
        <Skeleton className={styles.titleShape} />
        <Skeleton className={styles.subShape} />
        <Skeleton className={styles.descShape1} />
        <Skeleton className={styles.descShape2} />
        <div className={styles.buttonsShape}>
          <Skeleton className={styles.buttonPlaceholder} />
          <Skeleton className={styles.buttonPlaceholder} />
        </div>
      </div>
    </div>
  );
};
