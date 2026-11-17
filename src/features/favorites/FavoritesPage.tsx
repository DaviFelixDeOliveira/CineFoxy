import React, { useState, useMemo } from 'react';
import { Bookmark } from 'lucide-react';
import { MediaGrid } from '@/components/sections/MediaGrid';
import { PageLoading } from '@/components/feedback/PageLoading';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { OfflineState } from '@/components/feedback/OfflineState';
import { useAsyncViewState } from '@/hooks/useAsyncViewState';
import type { AsyncViewStatus } from '@/hooks/useAsyncViewState';
import type { MediaItem } from '@/types/media';
import styles from './FavoritesPage.module.css';

// Dados demonstrativos de favoritos para teste visual da Fase 2
const DEMO_FAVORITES: MediaItem[] = [
  { id: 'fav-1', title: 'O Enigma do Horizonte Laranja', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 8.5, genres: ['Ficção Científica'] },
  { id: 'fav-2', title: 'Aliança Silenciosa', overview: '', posterUrl: '', type: 'series', releaseYear: 2023, rating: 8.9, genres: ['Suspense'] },
  { id: 'fav-3', title: 'Crônicas do Cinema Silencioso', overview: '', posterUrl: '', type: 'movie', releaseYear: 2023, rating: 9.1, genres: ['Documentário'] }
];

export interface FavoritesPageProps {
  forcedStatus?: AsyncViewStatus;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ forcedStatus }) => {
  const [filterType, setFilterType] = useState<'all' | 'movie' | 'series' | 'channel'>('all');

  const filteredItems = useMemo(() => {
    return DEMO_FAVORITES.filter((item) => {
      if (filterType === 'all') return true;
      return item.type === filterType;
    });
  }, [filterType]);

  const { status, error, retry } = useAsyncViewState({
    hasData: DEMO_FAVORITES.length > 0,
    forcedStatus
  });

  if (status === 'loading') {
    return (
      <div className="pageTransition">
        <PageLoading variant="favorites" />
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

  return (
    <div className="pageTransition fadeIn">
      <div className={styles.header}>
        <h1 className={styles.title}>Minha Lista</h1>
        <p className={styles.subtitle}>
          Seus filmes, séries e canais favoritos reunidos em um único lugar.
        </p>

        {/* Filtros Internos por Tipo: Todos, Filmes, Séries e Canais */}
        <div
          className={styles.filterGroup}
          role="group"
          aria-label="Filtrar favoritos por tipo"
        >
          <button
            type="button"
            onClick={() => setFilterType('all')}
            aria-pressed={filterType === 'all'}
            className={`${styles.filterBtn} ${filterType === 'all' ? styles.filterActive : ''}`}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => setFilterType('movie')}
            aria-pressed={filterType === 'movie'}
            className={`${styles.filterBtn} ${filterType === 'movie' ? styles.filterActive : ''}`}
          >
            Filmes
          </button>
          <button
            type="button"
            onClick={() => setFilterType('series')}
            aria-pressed={filterType === 'series'}
            className={`${styles.filterBtn} ${filterType === 'series' ? styles.filterActive : ''}`}
          >
            Séries
          </button>
          <button
            type="button"
            onClick={() => setFilterType('channel')}
            aria-pressed={filterType === 'channel'}
            className={`${styles.filterBtn} ${filterType === 'channel' ? styles.filterActive : ''}`}
          >
            Canais
          </button>
        </div>
      </div>

      {status === 'empty' || filteredItems.length === 0 ? (
        <EmptyState
          icon={<Bookmark size={32} />}
          title="Sua lista ainda está vazia"
          description="Navegue pelo catálogo e adicione títulos ou canais à sua lista para encontrá-los facilmente."
        />
      ) : (
        <MediaGrid items={filteredItems} />
      )}
    </div>
  );
};
