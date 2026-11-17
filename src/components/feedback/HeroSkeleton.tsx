import React from 'react';
import { Skeleton } from './Skeleton';
import styles from './HeroSkeleton.module.css';

export interface HeroSkeletonProps {
  className?: string;
}

export const HeroSkeleton: React.FC<HeroSkeletonProps> = ({ className }) => {
  return (
    <section className={`${styles.heroSkeleton} ${className || ''}`} aria-busy="true" aria-label="Carregando destaque">
      <div className={styles.bgGrid} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, idx) => (
          <Skeleton key={`hero-bg-${idx}`} className={styles.bgPoster} />
        ))}
      </div>
      <div className={styles.bgScrim} aria-hidden="true" />

      <div className={styles.contentWrapper}>
        <Skeleton className={styles.badgeShape} />
        <Skeleton className={styles.logoShape} />
        <Skeleton className={styles.subShape} />
        <Skeleton className={styles.descShape1} />
        <Skeleton className={styles.descShape2} />
        <div className={styles.buttonsShape}>
          <Skeleton className={styles.buttonPlaceholder} />
          <Skeleton className={styles.buttonPlaceholder} />
        </div>
      </div>
    </section>
  );
};
