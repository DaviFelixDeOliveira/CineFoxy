import React from 'react';
import type { MediaItem } from '@/types/media';
import styles from './ContinueWatchingCard.module.css';

export interface ContinueWatchingItem {
  media: MediaItem;
  progressPercent: number; // 0 a 100
  timeRemainingLabel?: string;
  episodeLabel?: string;
}

export interface ContinueWatchingCardProps {
  item: ContinueWatchingItem;
  onClick?: () => void;
  className?: string;
}

export const ContinueWatchingCard: React.FC<ContinueWatchingCardProps> = ({
  item,
  onClick,
  className
}) => {
  const fallbackThumb =
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22320%22%20height%3D%22180%22%20viewBox%3D%220%200%20320%20180%22%3E%3Crect%20fill%3D%22%231A1A1A%22%20width%3D%22320%22%20height%3D%22180%22%2F%3E%3Ctext%20fill%3D%22%23FF5722%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3ECineFoxy%3C%2Ftext%3E%3C%2Fsvg%3E';

  return (
    <article
      className={`${styles.card} ${className || ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Continuar assistindo: ${item.media.title}`}
    >
      <div className={styles.thumbWrapper}>
        <img
          src={item.media.backdropUrl || item.media.posterUrl || fallbackThumb}
          alt={item.media.title}
          className={styles.thumbnail}
          loading="lazy"
        />
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${Math.min(100, Math.max(0, item.progressPercent))}%` }}
          />
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{item.media.title}</h3>
        <p className={styles.progressLabel}>
          {item.episodeLabel ? `${item.episodeLabel} • ` : ''}
          {item.timeRemainingLabel || `${item.progressPercent}% assistido`}
        </p>
      </div>
    </article>
  );
};
