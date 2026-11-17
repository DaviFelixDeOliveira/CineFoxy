import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
  className,
  style,
  ...props
}) => {
  const customStyle: React.CSSProperties = {
    width,
    height,
    borderRadius,
    ...style
  };

  return (
    <div
      className={`${styles.skeleton} ${className || ''}`}
      style={customStyle}
      aria-hidden="true"
      {...props}
    />
  );
};
