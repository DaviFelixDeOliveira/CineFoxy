import React from 'react';
import { Link } from 'react-router-dom';
import type { CategoryItem } from '@/types/category';
import { getGenreColor, getGenreGradient } from '@/app/config/genreColors';
import styles from './CategoryCard.module.css';

export interface CategoryCardProps {
  category: CategoryItem;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, className }) => {
  const genreTheme = getGenreColor(category.slug);
  const baseGradient = getGenreGradient(category.slug, 0.35);
  const hoverGradient = getGenreGradient(category.slug, 0.52);

  return (
    <Link
      to={`/categoria/${category.slug}`}
      className={`${styles.card} ${className || ''}`}
      aria-label={`Explorar categoria ${category.name}: ${category.description}`}
      style={
        {
          '--genre-color': genreTheme.hex,
          '--genre-rgb': genreTheme.rgb,
          '--genre-border': genreTheme.borderTint,
          '--genre-gradient': baseGradient,
          '--genre-gradient-hover': hoverGradient
        } as React.CSSProperties
      }
    >
      <div className={styles.gradientOverlay} />
      <div className={styles.accentBar} />
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.pill} style={{ backgroundColor: `rgba(${genreTheme.rgb}, 0.2)`, color: genreTheme.hex, borderColor: `rgba(${genreTheme.rgb}, 0.4)` }}>
            Gênero
          </span>
        </div>
        <h3 className={styles.name}>{category.name}</h3>
        <p className={styles.description}>{category.description}</p>
      </div>
    </Link>
  );
};
