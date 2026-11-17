import React from 'react';
import { Skeleton } from './Skeleton';
import { HeroSkeleton } from './HeroSkeleton';
import { MediaRowSkeleton } from './MediaRowSkeleton';
import { MediaGridSkeleton } from './MediaGridSkeleton';
import { CategoryGridSkeleton } from './CategoryGridSkeleton';
import { ContinueWatchingSectionSkeleton } from './ContinueWatchingSkeleton';
import { ChannelSkeleton } from './ChannelSkeleton';
import { SearchResultsSkeleton } from './SearchResultsSkeleton';
import { DetailsSkeleton } from './DetailsSkeleton';
import { getGenreColor } from '@/app/config/genreColors';
import styles from './PageLoading.module.css';

export type PageLoadingVariant =
  | 'home'
  | 'movies'
  | 'series'
  | 'categories'
  | 'category-detail'
  | 'favorites'
  | 'channels'
  | 'search'
  | 'history'
  | 'details';

export interface PageLoadingProps {
  variant: PageLoadingVariant;
  viewMode?: 'rows' | 'grid';
  genreSlug?: string;
  detailsVariant?: 'movie' | 'series';
  className?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({
  variant,
  viewMode = 'rows',
  genreSlug,
  detailsVariant = 'movie',
  className
}) => {
  const genreTheme = genreSlug ? getGenreColor(genreSlug) : null;

  return (
    <div className={`${styles.container} ${className || ''}`} aria-busy="true">
      <span className="sr-only">Carregando conteúdo da página...</span>

      {variant === 'home' && (
        <>
          <HeroSkeleton />
          <ContinueWatchingSectionSkeleton count={3} />
          <MediaRowSkeleton itemCount={5} />
          <MediaRowSkeleton itemCount={5} />
          <MediaRowSkeleton itemCount={5} />
          <section className={styles.sectionBlock} aria-hidden="true">
            <Skeleton className={styles.sectionTitle} />
            <CategoryGridSkeleton count={4} />
          </section>
        </>
      )}

      {(variant === 'movies' || variant === 'series') && (
        <>
          <div className={styles.catalogHeader} aria-hidden="true">
            <div className={styles.titleArea}>
              <Skeleton className={styles.pageTitle} />
              <Skeleton className={styles.pageSubtitle} />
            </div>
            <Skeleton className={styles.toggleBox} />
          </div>

          {viewMode === 'rows' ? (
            <>
              <MediaRowSkeleton itemCount={5} />
              <MediaRowSkeleton itemCount={5} />
              <MediaRowSkeleton itemCount={5} />
            </>
          ) : (
            <>
              <div className={styles.filterBar} aria-hidden="true">
                <Skeleton className={styles.filterSelect} />
                <Skeleton className={styles.filterSelect} />
              </div>
              <MediaGridSkeleton count={10} />
            </>
          )}
        </>
      )}

      {variant === 'categories' && (
        <>
          <div className={styles.simpleHeader} aria-hidden="true">
            <Skeleton className={styles.pageTitle} />
            <Skeleton className={styles.pageSubtitle} />
          </div>
          <CategoryGridSkeleton count={12} />
        </>
      )}

      {variant === 'category-detail' && (
        <>
          <div
            className={styles.categoryHeader}
            style={
              genreTheme
                ? ({
                    borderColor: `rgba(${genreTheme.rgb}, 0.35)`,
                    background: `linear-gradient(135deg, rgba(${genreTheme.rgb}, 0.14) 0%, transparent 70%)`
                  } as React.CSSProperties)
                : undefined
            }
            aria-hidden="true"
          >
            <Skeleton className={styles.backLink} />
            <Skeleton
              className={styles.genreBadge}
              style={
                genreTheme
                  ? { backgroundColor: `rgba(${genreTheme.rgb}, 0.25)` }
                  : undefined
              }
            />
            <Skeleton className={styles.pageTitle} />
            <Skeleton className={styles.pageSubtitle} />
            <div className={styles.segmentGroup}>
              <Skeleton className={styles.segmentBtn} />
              <Skeleton className={styles.segmentBtn} />
              <Skeleton className={styles.segmentBtn} />
            </div>
          </div>
          <MediaGridSkeleton count={10} />
        </>
      )}

      {variant === 'favorites' && (
        <>
          <div className={styles.simpleHeader} aria-hidden="true">
            <Skeleton className={styles.pageTitle} />
            <Skeleton className={styles.pageSubtitle} />
            <div className={styles.segmentGroup}>
              <Skeleton className={styles.segmentBtn} />
              <Skeleton className={styles.segmentBtn} />
              <Skeleton className={styles.segmentBtn} />
              <Skeleton className={styles.segmentBtn} />
            </div>
          </div>
          <MediaGridSkeleton count={6} />
        </>
      )}

      {variant === 'channels' && (
        <>
          <div className={styles.simpleHeader} aria-hidden="true">
            <Skeleton className={styles.pageTitle} />
            <Skeleton className={styles.pageSubtitle} />
            <div className={styles.channelTabs}>
              <Skeleton className={styles.channelTab} />
              <Skeleton className={styles.channelTab} />
              <Skeleton className={styles.channelTab} />
              <Skeleton className={styles.channelTab} />
            </div>
          </div>
          <div className={styles.channelGrid} aria-hidden="true">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ChannelSkeleton key={`chan-skel-${idx}`} />
            ))}
          </div>
        </>
      )}

      {variant === 'search' && (
        <>
          <div className={styles.simpleHeader} aria-hidden="true">
            <Skeleton className={styles.pageTitle} />
            <Skeleton className={styles.searchBar} />
          </div>
          <SearchResultsSkeleton />
        </>
      )}

      {variant === 'history' && (
        <>
          <div className={styles.simpleHeader} aria-hidden="true">
            <Skeleton className={styles.pageTitle} />
            <Skeleton className={styles.pageSubtitle} />
          </div>
          <ContinueWatchingSectionSkeleton count={6} />
        </>
      )}

      {variant === 'details' && <DetailsSkeleton variant={detailsVariant} />}
    </div>
  );
};
