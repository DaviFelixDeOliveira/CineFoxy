import React from 'react';
import { Skeleton } from './Skeleton';
import { TextSkeleton } from './TextSkeleton';
import { EpisodeSkeleton } from './EpisodeSkeleton';
import { MediaRowSkeleton } from './MediaRowSkeleton';
import styles from './DetailsSkeleton.module.css';

export interface DetailsSkeletonProps {
  variant?: 'movie' | 'series';
  className?: string;
}

export const DetailsSkeleton: React.FC<DetailsSkeletonProps> = ({
  variant = 'movie',
  className
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`} aria-busy="true">
      <span className="sr-only">Carregando detalhes do título...</span>

      {/* Banner principal */}
      <div className={styles.banner}>
        <Skeleton className={styles.backdrop} />
      </div>

      {/* Cabeçalho com pôster 2:3 + título + gêneros + sinopse + ficha técnica */}
      <div className={styles.mainInfo}>
        <div className={styles.posterCol}>
          <Skeleton className={styles.poster} />
        </div>

        <div className={styles.metaCol}>
          <Skeleton className={styles.title} />

          <div className={styles.techRow}>
            <Skeleton className={styles.techChip} />
            <Skeleton className={styles.techChip} />
            <Skeleton className={styles.techChip} />
            <Skeleton className={styles.techChip} />
          </div>

          <div className={styles.genreRow}>
            <Skeleton className={styles.genreTag} />
            <Skeleton className={styles.genreTag} />
            <Skeleton className={styles.genreTag} />
          </div>

          <TextSkeleton lines={4} variant="body" widths={['100%', '96%', '90%', '62%']} />

          <div className={styles.actions}>
            <Skeleton className={styles.primaryBtn} />
            <Skeleton className={styles.secondaryBtn} />
          </div>
        </div>
      </div>

      {/* Elenco */}
      <section className={styles.section}>
        <Skeleton className={styles.sectionTitle} />
        <div className={styles.castRow}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={`cast-skel-${idx}`} className={styles.castCard}>
              <Skeleton className={styles.castAvatar} />
              <Skeleton className={styles.castName} />
              <Skeleton className={styles.castRole} />
            </div>
          ))}
        </div>
      </section>

      {/* Temporadas e Episódios (quando variant === 'series') */}
      {variant === 'series' && (
        <section className={styles.section}>
          <div className={styles.seasonHeader}>
            <Skeleton className={styles.sectionTitle} />
            <div className={styles.seasonTabs}>
              <Skeleton className={styles.seasonTab} />
              <Skeleton className={styles.seasonTab} />
              <Skeleton className={styles.seasonTab} />
            </div>
          </div>
          <div className={styles.episodesList}>
            <EpisodeSkeleton />
            <EpisodeSkeleton />
            <EpisodeSkeleton />
          </div>
        </section>
      )}

      {/* Recomendações */}
      <MediaRowSkeleton itemCount={5} />
    </div>
  );
};

export interface PlayerSkeletonProps {
  className?: string;
}

export const PlayerSkeleton: React.FC<PlayerSkeletonProps> = ({ className }) => {
  return (
    <div className={`${styles.playerContainer} ${className || ''}`} aria-busy="true">
      <span className="sr-only">Preparando reprodutor...</span>
      <div className={styles.playerViewport}>
        <Skeleton className={styles.playerSurface} />
        <div className={styles.playerControlsBar}>
          <Skeleton className={styles.progressBar} />
          <div className={styles.controlsRow}>
            <div className={styles.controlsGroup}>
              <Skeleton className={styles.controlBtn} />
              <Skeleton className={styles.controlBtn} />
              <Skeleton className={styles.timeLabel} />
            </div>
            <div className={styles.controlsGroup}>
              <Skeleton className={styles.controlBtn} />
              <Skeleton className={styles.controlBtn} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.playerMeta}>
        <Skeleton className={styles.playerTitle} />
        <Skeleton className={styles.playerSubtitle} />
      </div>
    </div>
  );
};
