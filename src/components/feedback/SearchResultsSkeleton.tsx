import React from 'react';
import { Skeleton } from './Skeleton';
import { MediaGridSkeleton } from './MediaGridSkeleton';
import styles from './SearchResultsSkeleton.module.css';

export interface SearchResultsSkeletonProps {
  showFilters?: boolean;
  className?: string;
}

export const SearchResultsSkeleton: React.FC<SearchResultsSkeletonProps> = ({
  showFilters = true,
  className
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`} aria-busy="true">
      <span className="sr-only">Buscando títulos no catálogo...</span>

      {showFilters && (
        <div className={styles.filtersRow} aria-hidden="true">
          <Skeleton className={styles.filterChip} />
          <Skeleton className={styles.filterChip} />
          <Skeleton className={styles.filterChip} />
        </div>
      )}

      <section className={styles.section} aria-hidden="true">
        <Skeleton className={styles.sectionHeading} />
        <MediaGridSkeleton count={5} />
      </section>

      <section className={styles.section} aria-hidden="true">
        <Skeleton className={styles.sectionHeading} />
        <MediaGridSkeleton count={5} />
      </section>
    </div>
  );
};
