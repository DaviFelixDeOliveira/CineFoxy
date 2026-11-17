import React, { useState } from 'react';
import { LayoutGrid, Rows, Film } from 'lucide-react';
import { MediaRow } from '@/components/sections/MediaRow';
import { MediaGrid } from '@/components/sections/MediaGrid';
import { PageLoading } from '@/components/feedback/PageLoading';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { OfflineState } from '@/components/feedback/OfflineState';
import { useAsyncViewState } from '@/hooks/useAsyncViewState';
import type { AsyncViewStatus } from '@/hooks/useAsyncViewState';
import { CINEFOXY_CATEGORIES } from '@/types/category';
import type { MediaItem } from '@/types/media';
import styles from './MoviesPage.module.css';

// Base curada de filmes para demonstração da Fase 2
const DEMO_MOVIES: MediaItem[] = [
  { id: 'm-1', title: 'O Enigma do Horizonte Laranja', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 8.5, genres: ['Ficção Científica'] },
  { id: 'm-2', title: 'Velocidade e Sombras', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 7.9, genres: ['Ação'] },
  { id: 'm-3', title: 'A Noite das Raposas Estelares', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 8.8, genres: ['Aventura'] },
  { id: 'm-4', title: 'Além da Colina das Sombras', overview: '', posterUrl: '', type: 'movie', releaseYear: 2023, rating: 8.2, genres: ['Animação'] },
  { id: 'm-5', title: 'Crônicas do Cinema Silencioso', overview: '', posterUrl: '', type: 'movie', releaseYear: 2023, rating: 9.1, genres: ['Documentário'] },
  { id: 'm-6', title: 'Chamas no Ártico', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 7.6, genres: ['Ação'] },
  { id: 'm-7', title: 'Falcões da Noite', overview: '', posterUrl: '', type: 'movie', releaseYear: 2023, rating: 8.7, genres: ['Crime'] },
  { id: 'm-8', title: 'O Violinista da Estação', overview: '', posterUrl: '', type: 'movie', releaseYear: 2023, rating: 8.1, genres: ['Drama'] }
];

export interface MoviesPageProps {
  forcedStatus?: AsyncViewStatus;
}

export const MoviesPage: React.FC<MoviesPageProps> = ({ forcedStatus }) => {
  const [viewMode, setViewMode] = useState<'rows' | 'grid'>('rows');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');

  const filteredMovies = DEMO_MOVIES.filter((movie) => {
    if (selectedGenre === 'all') return true;
    return movie.genres?.includes(selectedGenre);
  });

  const { status, error, retry } = useAsyncViewState({
    hasData: DEMO_MOVIES.length > 0,
    forcedStatus
  });

  if (status === 'loading') {
    return (
      <div className="pageTransition">
        <PageLoading variant="movies" viewMode={viewMode} />
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

  if (status === 'empty') {
    return (
      <div className="pageTransition">
        <EmptyState
          icon={<Film size={32} />}
          title="Nenhum filme encontrado"
          description="Não há filmes disponíveis nesta seleção no momento."
        />
      </div>
    );
  }

  return (
    <div className="pageTransition fadeIn">
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Catálogo de Filmes</h1>
          <p className={styles.subtitle}>
            Explore coleções editoriais temáticas ou filtre todo o acervo cinematográfico.
          </p>
        </div>

        {/* Alternador de Modo: Trilhos vs Grade Completa */}
        <div className={styles.viewToggle} role="group" aria-label="Modo de visualização">
          <button
            type="button"
            className={`${styles.toggleButton} ${viewMode === 'rows' ? styles.toggleActive : ''}`}
            onClick={() => setViewMode('rows')}
            aria-pressed={viewMode === 'rows'}
          >
            <Rows size={16} />
            <span>Coleções</span>
          </button>
          <button
            type="button"
            className={`${styles.toggleButton} ${viewMode === 'grid' ? styles.toggleActive : ''}`}
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
          >
            <LayoutGrid size={16} />
            <span>Grade Completa</span>
          </button>
        </div>
      </div>

      {viewMode === 'rows' ? (
        <div>
          {/* As 14 Coleções Oficiais de Filmes */}
          <MediaRow title="🔥 Em Alta" description="Filmes em destaque segundo as tendências do catálogo" items={DEMO_MOVIES} />
          <MediaRow title="✨ Lançamentos Recentes" description="Novidades do cinema adicionadas recentemente" items={DEMO_MOVIES} />
          <MediaRow title="🏆 Mais Bem Avaliados" description="Obras com alta aprovação e volume consistente de votos" items={DEMO_MOVIES} />
          <MediaRow title="💎 Joias Escondidas" description="Produções de qualidade destacada fora do circuito massivo" items={DEMO_MOVIES} />
          <MediaRow title="💥 Ação Sem Limites" description="Ritmo acelerado, adrenalina e confrontos épicos" items={DEMO_MOVIES} />
          <MediaRow title="🧭 Grandes Aventuras" description="Expedições, exploração e viagens extraordinárias" items={DEMO_MOVIES} />
          <MediaRow title="🥋 Mestres da Luta" description="Artes marciais, combate corpo a corpo e duelos clássicos" items={DEMO_MOVIES} />
          <MediaRow title="🔦 Apague as Luzes" description="Suspense psicológico denso e terror cinematográfico" items={DEMO_MOVIES} />
          <MediaRow title="🚀 Além da Realidade" description="Ficção científica, futuros distópicos e universos paralelos" items={DEMO_MOVIES} />
          <MediaRow title="❤️ Amor e Boas Histórias" description="Romances envolventes e dramas humanos profundos" items={DEMO_MOVIES} />
          <MediaRow title="😂 Para Dar Boas Risadas" description="Comédias inteligentes, sátiras e bom humor" items={DEMO_MOVIES} />
          <MediaRow title="⏳ Clássicos Inesquecíveis" description="Produções históricas que moldaram a sétima arte" items={DEMO_MOVIES} />
          <MediaRow title="🕵️ Crime e Investigação" description="Filmes policiais, investigações forenses e tribunais" items={DEMO_MOVIES} />
          <MediaRow title="🏔️ Sobrevivência Extrema" description="Desafios humanos contra a natureza e isolamento" items={DEMO_MOVIES} />
        </div>
      ) : (
        <div>
          {/* Barra de Filtros da Grade Completa */}
          <div className={styles.filterBar}>
            <label htmlFor="genreFilter" className="sr-only">Filtrar por Gênero</label>
            <select
              id="genreFilter"
              className={styles.filterSelect}
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="all">Todos os Gêneros</option>
              {CINEFOXY_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label htmlFor="sortFilter" className="sr-only">Ordenar Por</label>
            <select
              id="sortFilter"
              className={styles.filterSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Mais Populares</option>
              <option value="rating">Mais Bem Avaliados</option>
              <option value="recent">Lançamentos Recentes</option>
            </select>
          </div>

          {filteredMovies.length > 0 ? (
            <MediaGrid items={filteredMovies} />
          ) : (
            <EmptyState
              icon={<Film size={32} />}
              title="Nenhum filme encontrado"
              description="Ajuste os filtros de gênero para visualizar outros filmes do catálogo."
            />
          )}
        </div>
      )}
    </div>
  );
};
