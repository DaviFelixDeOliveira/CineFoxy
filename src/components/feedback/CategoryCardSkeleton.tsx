import React from 'react';
import { Skeleton } from './Skeleton';

export interface CategoryCardSkeletonProps {
  className?: string;
}

export const CategoryCardSkeleton: React.FC<CategoryCardSkeletonProps> = ({ className }) => {
  return (
    <div
      className={`${className || ''}`}
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        position: 'relative'
      }}
      aria-busy="true"
    >
      <Skeleton style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-md)' }} />
    </div>
  );
};
