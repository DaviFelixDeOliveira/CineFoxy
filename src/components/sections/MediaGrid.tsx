import React from 'react';
import { MediaCard } from '@/components/cards/MediaCard';
import type { MediaItem } from '@/types/media';
import { useInView } from '@/hooks/useInView';
import styles from './MediaGrid.module.css';

export interface MediaGridProps {
  items: MediaItem[];
  onItemClick?: (item: MediaItem) => void;
  className?: string;
}

export const MediaGrid: React.FC<MediaGridProps> = ({ items, onItemClick, className }) => {
  const { ref, isInView } = useInView<HTMLDivElement>({ rootMargin: '60px', triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`${styles.grid} ${isInView ? styles.revealed : styles.hidden} ${className || ''}`}
    >
      {items.map((item) => (
        <MediaCard key={item.id} item={item} onClick={() => onItemClick?.(item)} />
      ))}
    </div>
  );
};
