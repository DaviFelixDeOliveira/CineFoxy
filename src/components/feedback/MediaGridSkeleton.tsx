import React from 'react';
import { PosterSkeleton } from './PosterSkeleton';
import styles from '@/components/sections/MediaGrid.module.css';

export interface MediaGridSkeletonProps {
  count?: number;
  className?: string;
}

export const MediaGridSkeleton: React.FC<MediaGridSkeletonProps> = ({
  count = 10,
  className
}) => {
  return (
    <div className={`${styles.grid} ${className || ''}`} aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <PosterSkeleton key={`grid-skel-${index}`} />
      ))}
    </div>
  );
};
