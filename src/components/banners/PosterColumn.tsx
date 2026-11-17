import React, { useState } from 'react';
import styles from './PosterColumn.module.css';

export interface PosterColumnProps {
  images: string[];
  direction?: 'up' | 'down';
  durationSeconds?: number;
  className?: string;
}

export const PosterColumn: React.FC<PosterColumnProps> = ({
  images,
  direction = 'up',
  durationSeconds = 45,
  className
}) => {
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});

  const handleImageLoad = (key: string) => {
    setLoadedMap((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  };

  const renderGroup = (groupKey: string) => (
    <div className={styles.group}>
      {images.map((src, index) => {
        const imgKey = `${groupKey}-${index}`;
        const isLoaded = Boolean(loadedMap[imgKey]);
        return (
          <div key={imgKey} className={styles.card}>
            {!isLoaded && <div className={styles.cardPlaceholder} aria-hidden="true" />}
            <img
              src={src}
              alt=""
              className={`${styles.poster} ${isLoaded ? styles.posterLoaded : ''}`}
              loading="eager"
              decoding="async"
              onLoad={() => handleImageLoad(imgKey)}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={`${styles.column} ${className || ''}`} aria-hidden="true">
      <div
        className={`${styles.track} ${direction === 'up' ? styles.up : styles.down}`}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {renderGroup('a')}
        {renderGroup('b')}
      </div>
    </div>
  );
};
