import React from 'react';
import { CategoryCardSkeleton } from './CategoryCardSkeleton';
import styles from './CategoryGridSkeleton.module.css';

export interface CategoryGridSkeletonProps {
  count?: number;
  className?: string;
}

export const CategoryGridSkeleton: React.FC<CategoryGridSkeletonProps> = ({
  count = 8,
  className
}) => {
  return (
    <div className={`${styles.grid} ${className || ''}`} aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <CategoryCardSkeleton key={`cat-skel-${index}`} />
      ))}
    </div>
  );
};
