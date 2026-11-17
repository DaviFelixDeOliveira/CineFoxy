import React from 'react';
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
  // Duplicação para loop contínuo sem saltos perceptíveis
  const duplicatedImages = [...images, ...images];

  return (
    <div className={`${styles.column} ${className || ''}`} aria-hidden="true">
      <div
        className={`${styles.track} ${direction === 'up' ? styles.up : styles.down}`}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {duplicatedImages.map((src, index) => (
          <div key={`${src}-${index}`} className={styles.card}>
            <img
              src={src}
              alt=""
              className={styles.poster}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
