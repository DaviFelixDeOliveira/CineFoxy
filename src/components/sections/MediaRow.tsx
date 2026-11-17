import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaCard } from '@/components/cards/MediaCard';
import type { MediaItem } from '@/types/media';
import styles from './MediaRow.module.css';

export interface MediaRowProps {
  title: string;
  description?: string;
  items: MediaItem[];
  onItemClick?: (item: MediaItem) => void;
  className?: string;
}

export const MediaRow: React.FC<MediaRowProps> = ({
  title,
  description,
  items,
  onItemClick,
  className
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [items]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Se houver menos de 5 títulos conforme as regras das coleções, oculta a fileira
  if (items.length < 5) {
    return null;
  }

  return (
    <section
      className={`${styles.rowContainer} ${className || ''}`}
      aria-label={title}
    >
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>

        <div className={styles.controls} aria-hidden="true">
          <button
            type="button"
            className={`${styles.arrowButton} ${!canScrollLeft ? styles.disabled : ''}`}
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label={`Rolar ${title} para a esquerda`}
            tabIndex={-1}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className={`${styles.arrowButton} ${!canScrollRight ? styles.disabled : ''}`}
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label={`Rolar ${title} para a direita`}
            tabIndex={-1}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={styles.scrollArea}
        onScroll={checkScroll}
        tabIndex={0}
        role="region"
        aria-label={`Lista de títulos: ${title}`}
      >
        <div className={styles.track}>
          {items.map((item) => (
            <div key={item.id} className={styles.itemWrapper}>
              <MediaCard item={item} onClick={() => onItemClick?.(item)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
