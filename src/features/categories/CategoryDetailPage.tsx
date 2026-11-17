import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Film } from 'lucide-react';
import { MediaGrid } from '@/components/sections/MediaGrid';
import { PageLoading } from '@/components/feedback/PageLoading';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { OfflineState } from '@/components/feedback/OfflineState';
import { useAsyncViewState } from '@/hooks/useAsyncViewState';
import type { AsyncViewStatus } from '@/hooks/useAsyncViewState';
import { CINEFOXY_CATEGORIES } from '@/types/category';
import type { MediaTypeFilter } from '@/types/category';
import type { MediaItem } from '@/types/media';
import { ROUTES } from '@/app/config/constants';
import { getGenreColor } from '@/app/config/genreColors';
import styles from './CategoryDetailPage.module.css';

// Base curada de exemplo para demonstração de categoria na Fase 2
const SAMPLE_CATEGORY_ITEMS: MediaItem[] = [
  { id: 'cat-m-1', title: 'O Enigma do Horizonte Laranja', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 8.5, genres: ['Ação', 'Ficção Científica', 'Suspense'] },
  { id: 'cat-s-1', title: 'Aliança Silenciosa', overview: '', posterUrl: '', type: 'series', releaseYear: 2023, rating: 8.9, genres: ['Ação', 'Suspense', 'Drama'] },
  { id: 'cat-m-2', title: 'Velocidade e Sombras', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 7.9, genres: ['Ação', 'Aventura'] },
  { id: 'cat-s-2', title: 'O Último Guardião do Tempo', overview: '', posterUrl: '', type: 'series', releaseYear: 2024, rating: 8.6, genres: ['Aventura', 'Fantasia', 'Ficção Científica'] },
  { id: 'cat-m-3', title: 'Chamas no Ártico', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 7.6, genres: ['Ação', 'Aventura'] }
];

export interface CategoryDetailPageProps {
  forcedStatus?: AsyncViewStatus;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({ forcedStatus }) => {
  const { slug } = useParams<{ slug: string }>();
  const [typeFilter, setTypeFilter] = useState<MediaTypeFilter>('all');

  const category = useMemo(() => {
    return CINEFOXY_CATEGORIES.find((cat) => cat.slug === slug);
  }, [slug]);

  const genreTheme = category ? getGenreColor(category.slug) : null;

  const items = useMemo(() => {
    return SAMPLE_CATEGORY_ITEMS.filter((item) => {
      if (typeFilter !== 'all' && item.type !== typeFilter) {
        return false;
      }
      return true;
    });
  }, [typeFilter]);

  const { status, error, retry } = useAsyncViewState({
    hasData: Boolean(category),
    forcedStatus
  });

  if (status === 'loading') {
    return (
      <div className="pageTransition">
        <PageLoading variant="category-detail" genreSlug={category?.slug || slug} />
      </div>
    );
  }

  if (status === 'offline') {
    return (
      <div className="pageTransition">
        <OfflineState onRetry={retry} />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="pageTransition">
        <ErrorState error={error} onRetry={retry} />
      </div>
    );
  }

  if (!category || status === 'empty') {
    return (
      <div className="pageTransition">
        <EmptyState
          icon={<Film size={32} />}
          title={category ? `Nenhum título em ${category.name}` : 'Categoria não encontrada'}
          description={
            category
              ? 'Nenhum título disponível nesta categoria no momento.'
              : 'A categoria solicitada não existe ou foi movida.'
          }
          action={
            <Link to={ROUTES.CATEGORIES} style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>
              Voltar para Categorias
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="pageTransition fadeIn">
      <div
        className={styles.header}
        style={genreTheme ? ({ '--genre-header-color': genreTheme.hex, '--genre-header-rgb': genreTheme.rgb } as React.CSSProperties) : undefined}
      >
        <Link to={ROUTES.CATEGORIES} className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Voltar para Categorias</span>
        </Link>

        <div className={styles.titleArea}>
          <div className={styles.badgeRow}>
            {genreTheme && (
              <span
                className={styles.genreBadge}
                style={{
                  backgroundColor: `rgba(${genreTheme.rgb}, 0.16)`,
                  color: genreTheme.hex,
                  borderColor: `rgba(${genreTheme.rgb}, 0.35)`
                }}
              >
                Gênero Oficial
              </span>
            )}
          </div>
          <h1 className={styles.title}>{category.name}</h1>
          <p className={styles.description}>{category.description}</p>
        </div>

        {/* Filtro Segmentador Interno: [ Todos ] [ Filmes ] [ Séries ] */}
        <div className={styles.filterSegment} role="group" aria-label="Filtrar por tipo">
          <button
            type="button"
            className={`${styles.segmentBtn} ${typeFilter === 'all' ? styles.segmentActive : ''}`}
            onClick={() => setTypeFilter('all')}
            aria-pressed={typeFilter === 'all'}
          >
            Todos
          </button>
          <button
            type="button"
            className={`${styles.segmentBtn} ${typeFilter === 'movie' ? styles.segmentActive : ''}`}
            onClick={() => setTypeFilter('movie')}
            aria-pressed={typeFilter === 'movie'}
          >
            Filmes
          </button>
          <button
            type="button"
            className={`${styles.segmentBtn} ${typeFilter === 'series' ? styles.segmentActive : ''}`}
            onClick={() => setTypeFilter('series')}
            aria-pressed={typeFilter === 'series'}
          >
            Séries
          </button>
        </div>
      </div>

      {items.length > 0 ? (
        <MediaGrid items={items} />
      ) : (
        <EmptyState
          icon={<Film size={32} />}
          title={`Nenhum título em ${category.name}`}
          description="Ajuste os filtros de tipo para visualizar outros conteúdos desta categoria."
        />
      )}
    </div>
  );
};
