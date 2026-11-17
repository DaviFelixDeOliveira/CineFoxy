import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { MediaGrid } from '@/components/sections/MediaGrid';
import { SearchResultsSkeleton } from '@/components/feedback/SearchResultsSkeleton';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { OfflineState } from '@/components/feedback/OfflineState';
import { useAsyncViewState } from '@/hooks/useAsyncViewState';
import type { AsyncViewStatus } from '@/hooks/useAsyncViewState';
import type { MediaItem } from '@/types/media';
import styles from './SearchPage.module.css';

const LOCAL_CATALOG_SAMPLE: MediaItem[] = [
  { id: 'sr-1', title: 'O Enigma do Horizonte Laranja', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 8.5, genres: ['Ficção Científica'] },
  { id: 'sr-2', title: 'Velocidade e Sombras', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 7.9, genres: ['Ação'] },
  { id: 'sr-3', title: 'Aliança Silenciosa', overview: '', posterUrl: '', type: 'series', releaseYear: 2023, rating: 8.9, genres: ['Suspense'] },
  { id: 'sr-4', title: 'O Último Guardião do Tempo', overview: '', posterUrl: '', type: 'series', releaseYear: 2024, rating: 8.6, genres: ['Fantasia'] },
  { id: 'sr-5', title: 'Chamas no Ártico', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 7.6, genres: ['Ação'] }
];

export interface SearchPageProps {
  forcedStatus?: AsyncViewStatus;
  initialQuery?: string;
}

export const SearchPage: React.FC<SearchPageProps> = ({ forcedStatus, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState<'all' | 'movie' | 'series'>('all');

  const trimmedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!trimmedQuery) return [];
    return LOCAL_CATALOG_SAMPLE.filter((item) => {
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;
      return (
        item.title.toLowerCase().includes(trimmedQuery) ||
        item.genres?.some((g) => g.toLowerCase().includes(trimmedQuery))
      );
    });
  }, [trimmedQuery, typeFilter]);

  const movieResults = results.filter((item) => item.type === 'movie');
  const seriesResults = results.filter((item) => item.type === 'series');

  const { status, error, retry } = useAsyncViewState({
    hasData: results.length > 0,
    forcedStatus
  });

  const isUpdatingExisting = status === 'loading' && results.length > 0;

  return (
    <div className="pageTransition">
      <div className={styles.header}>
        <h1 className={styles.title}>Pesquisa Global</h1>
        <p className={styles.subtitle}>
          Encontre filmes, séries e produções por título ou gênero.
        </p>

        {/* Campo de pesquisa permanece sempre utilizável durante carregamentos */}
        <div className={styles.searchBarWrapper}>
          <Search size={18} className={styles.searchIcon} aria-hidden="true" />
          <label htmlFor="globalSearchInput" className="sr-only">
            Pesquisar filmes e séries
          </label>
          <input
            id="globalSearchInput"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o nome de um filme, série ou gênero..."
            className={styles.searchInput}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className={styles.clearButton}
              aria-label="Limpar pesquisa"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className={styles.filterRow} role="group" aria-label="Filtrar resultados por tipo">
          <button
            type="button"
            onClick={() => setTypeFilter('all')}
            aria-pressed={typeFilter === 'all'}
            className={`${styles.filterChip} ${typeFilter === 'all' ? styles.filterActive : ''}`}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => setTypeFilter('movie')}
            aria-pressed={typeFilter === 'movie'}
            className={`${styles.filterChip} ${typeFilter === 'movie' ? styles.filterActive : ''}`}
          >
            Filmes
          </button>
          <button
            type="button"
            onClick={() => setTypeFilter('series')}
            aria-pressed={typeFilter === 'series'}
            className={`${styles.filterChip} ${typeFilter === 'series' ? styles.filterActive : ''}`}
          >
            Séries
          </button>

          {isUpdatingExisting && (
            <span className={styles.updatingIndicator} role="status" aria-live="polite">
              Atualizando resultados...
            </span>
          )}
        </div>
      </div>

      {status === 'offline' && <OfflineState onRetry={retry} />}

      {status === 'error' && <ErrorState error={error} onRetry={retry} />}

      {status === 'loading' && !isUpdatingExisting && (
        <SearchResultsSkeleton showFilters={false} />
      )}

      {status === 'loading' && isUpdatingExisting && (
        <div className={styles.updatingResults}>
          {movieResults.length > 0 && (
            <section className={styles.resultsSection}>
              <h2 className={styles.sectionHeading}>Filmes</h2>
              <MediaGrid items={movieResults} />
            </section>
          )}
          {seriesResults.length > 0 && (
            <section className={styles.resultsSection}>
              <h2 className={styles.sectionHeading}>Séries</h2>
              <MediaGrid items={seriesResults} />
            </section>
          )}
        </div>
      )}

      {status === 'empty' && (
        <EmptyState
          icon={<Search size={32} />}
          title={trimmedQuery ? 'Nenhum título encontrado' : 'Busca Global no CineFoxy'}
          description={
            trimmedQuery
              ? `Não encontramos resultados para "${query}". Tente outro termo ou ajuste os filtros.`
              : 'Digite um termo acima para pesquisar no catálogo. A integração completa com a API TMDB será conectada na Fase 3.'
          }
        />
      )}

      {status === 'success' && (
        <div className={styles.resultsContainer}>
          {movieResults.length > 0 && (
            <section className={styles.resultsSection}>
              <h2 className={styles.sectionHeading}>Filmes ({movieResults.length})</h2>
              <MediaGrid items={movieResults} />
            </section>
          )}

          {seriesResults.length > 0 && (
            <section className={styles.resultsSection}>
              <h2 className={styles.sectionHeading}>Séries ({seriesResults.length})</h2>
              <MediaGrid items={seriesResults} />
            </section>
          )}
        </div>
      )}
    </div>
  );
};
