import React, { useState } from 'react';
import { LayoutGrid, Rows } from 'lucide-react';
import { MediaRow } from '@/components/sections/MediaRow';
import { MediaGrid } from '@/components/sections/MediaGrid';
import { CINEFOXY_CATEGORIES } from '@/types/category';
import type { MediaItem } from '@/types/media';
import styles from '@/features/movies/MoviesPage.module.css';

// Base curada de séries para demonstração da Fase 2
const DEMO_SERIES: MediaItem[] = [
  { id: 's-1', title: 'Aliança Silenciosa', overview: '', posterUrl: '', type: 'series', releaseYear: 2023, rating: 8.9, genres: ['Suspense'] },
  { id: 's-2', title: 'O Último Guardião do Tempo', overview: '', posterUrl: '', type: 'series', releaseYear: 2024, rating: 8.6, genres: ['Fantasia'] },
  { id: 's-3', title: 'Labirinto Digital', overview: '', posterUrl: '', type: 'series', releaseYear: 2024, rating: 8.7, genres: ['Ficção Científica'] },
  { id: 's-4', title: 'Fronteira Oculta', overview: '', posterUrl: '', type: 'series', releaseYear: 2024, rating: 8.2, genres: ['Mistério'] },
  { id: 's-5', title: 'O Peso da Verdade', overview: '', posterUrl: '', type: 'series', releaseYear: 2022, rating: 9.0, genres: ['Drama'] },
  { id: 's-6', title: 'Caminhos do Vento', overview: '', posterUrl: '', type: 'series', releaseYear: 2023, rating: 8.0, genres: ['Aventura'] },
  { id: 's-7', title: 'Tempo e Memória', overview: '', posterUrl: '', type: 'series', releaseYear: 2023, rating: 8.9, genres: ['Mistério'] },
  { id: 's-8', title: 'Código de Honra', overview: '', posterUrl: '', type: 'series', releaseYear: 2024, rating: 8.4, genres: ['Crime'] }
];

export const SeriesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'rows' | 'grid'>('rows');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');

  const filteredSeries = DEMO_SERIES.filter((item) => {
    if (selectedGenre === 'all') return true;
    return item.genres?.includes(selectedGenre);
  });

  return (
    <div className="pageTransition">
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Catálogo de Séries</h1>
          <p className={styles.subtitle}>
            Grandes universos narrativos, temporadas completas e produções seriadas exclusivas.
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
          {/* As 13 Coleções Oficiais de Séries */}
          <MediaRow title="🔥 Em Alta" description="Séries em evidência segundo as tendências do catálogo" items={DEMO_SERIES} />
          <MediaRow title="✨ Novas Séries" description="Produções com estreias recentes" items={DEMO_SERIES} />
          <MediaRow title="🏆 Mais Bem Avaliadas" description="Séries consagradas com alta pontuação do público" items={DEMO_SERIES} />
          <MediaRow title="💎 Joias Escondidas" description="Produções de qualidade destacada fora do circuito massivo" items={DEMO_SERIES} />
          <MediaRow title="🕵️ Investigação Criminal" description="Procedurais policiais, detetives e mistérios em episódios" items={DEMO_SERIES} />
          <MediaRow title="🔦 Suspense e Mistério" description="Enredos intrigantes, conspirações e reviravoltas contínuas" items={DEMO_SERIES} />
          <MediaRow title="🚀 Universos de Ficção Científica" description="Viagens espaciais, distopias e futuros tecnológicos" items={DEMO_SERIES} />
          <MediaRow title="🧙 Fantasia e Mundos Mágicos" description="Reinos épicos, magia e sagas mitológicas" items={DEMO_SERIES} />
          <MediaRow title="😂 Séries Para Rir" description="Sitcoms inteligentes e comédias episódicas para maratonar" items={DEMO_SERIES} />
          <MediaRow title="🎒 Drama Adolescente" description="Amadurecimento, relações e desafios da juventude" items={DEMO_SERIES} />
          <MediaRow title="🎨 Anime e Animação" description="Produções animadas ocidentais e orientais consagradas" items={DEMO_SERIES} />
          <MediaRow title="👑 Época e História" description="Recriações de períodos históricos, dinastias e biografias" items={DEMO_SERIES} />
          <MediaRow title="📺 Séries Clássicas" description="Produções históricas que definiram a televisão" items={DEMO_SERIES} />
        </div>
      ) : (
        <div>
          {/* Barra de Filtros da Grade Completa */}
          <div className={styles.filterBar}>
            <label htmlFor="seriesGenreFilter" className="sr-only">Filtrar por Gênero</label>
            <select
              id="seriesGenreFilter"
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

            <label htmlFor="seriesSortFilter" className="sr-only">Ordenar Por</label>
            <select
              id="seriesSortFilter"
              className={styles.filterSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Mais Populares</option>
              <option value="rating">Mais Bem Avaliadas</option>
              <option value="recent">Estreias Recentes</option>
            </select>
          </div>

          <MediaGrid items={filteredSeries} />
        </div>
      )}
    </div>
  );
};
