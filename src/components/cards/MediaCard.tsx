import React, { useState } from 'react';
import type { MediaItem } from '@/types/media';
import { Badge } from '@/components/ui/Badge';
import { getGenreColor } from '@/app/config/genreColors';
import styles from './MediaCard.module.css';

export interface MediaCardProps {
  item: MediaItem;
  onClick?: () => void;
  className?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onClick, className }) => {
  const [imageError, setImageError] = useState(false);

  const fallbackPoster =
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22450%22%20viewBox%3D%220%200%20300%20450%22%3E%3Crect%20fill%3D%22%23141414%22%20width%3D%22300%22%20height%3D%22450%22%2F%3E%3Ctext%20fill%3D%22%23FF5722%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20dy%3D%2210.5%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3ECineFoxy%3C%2Ftext%3E%3C%2Fsvg%3E';

  const primaryGenre = item.genres && item.genres.length > 0 ? item.genres[0] : undefined;
  const genreTheme = primaryGenre ? getGenreColor(primaryGenre) : null;

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
      aria-label={`${item.title} (${item.releaseYear || 'Sem ano'})`}
    >
      <div className={styles.posterWrapper}>
        {item.rating && (
          <div className={styles.badgeTop}>
            <Badge variant="primary">★ {item.rating.toFixed(1)}</Badge>
          </div>
        )}

        <img
          src={imageError || !item.posterUrl ? fallbackPoster : item.posterUrl}
          alt={item.title}
          className={styles.poster}
          loading="lazy"
          onError={() => setImageError(true)}
        />
        
        {/* Overlay cinematográfico discreto revelado no hover */}
        <div className={styles.hoverOverlay} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title} title={item.title}>
          {item.title}
        </h3>
        <div className={styles.meta}>
          {item.releaseYear && <span>{item.releaseYear}</span>}
          {genreTheme && (
            <span
              className={styles.genreTag}
              style={{
                backgroundColor: `rgba(${genreTheme.rgb}, 0.16)`,
                color: genreTheme.hex,
                borderColor: `rgba(${genreTheme.rgb}, 0.35)`
              }}
            >
              {primaryGenre}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
