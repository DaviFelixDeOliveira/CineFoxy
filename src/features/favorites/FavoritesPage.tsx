import React, { useState, useMemo } from 'react';
import { Bookmark } from 'lucide-react';
import { MediaGrid } from '@/components/sections/MediaGrid';
import { EmptyState } from '@/components/feedback/EmptyState';
import type { MediaItem } from '@/types/media';

// Dados demonstrativos de favoritos para teste visual da Fase 2
const DEMO_FAVORITES: MediaItem[] = [
  { id: 'fav-1', title: 'O Enigma do Horizonte Laranja', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 8.5, genres: ['Ficção Científica'] },
  { id: 'fav-2', title: 'Aliança Silenciosa', overview: '', posterUrl: '', type: 'series', releaseYear: 2023, rating: 8.9, genres: ['Suspense'] },
  { id: 'fav-3', title: 'Crônicas do Cinema Silencioso', overview: '', posterUrl: '', type: 'movie', releaseYear: 2023, rating: 9.1, genres: ['Documentário'] }
];

export const FavoritesPage: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'movie' | 'series' | 'channel'>('all');

  const filteredItems = useMemo(() => {
    return DEMO_FAVORITES.filter((item) => {
      if (filterType === 'all') return true;
      return item.type === filterType;
    });
  }, [filterType]);

  return (
    <div className="pageTransition">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
          Minha Lista
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Seus filmes, séries e produções favoritas reunidas em um único lugar.
        </p>

        {/* Filtros Internos por Tipo */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-2)',
            marginTop: 'var(--space-4)',
            backgroundColor: 'var(--surface-elevated)',
            padding: '3px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-default)',
            width: 'fit-content'
          }}
          role="group"
          aria-label="Filtrar favoritos por tipo"
        >
          <button
            type="button"
            onClick={() => setFilterType('all')}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              backgroundColor: filterType === 'all' ? 'var(--brand-primary)' : 'transparent',
              color: filterType === 'all' ? 'var(--brand-contrast)' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => setFilterType('movie')}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              backgroundColor: filterType === 'movie' ? 'var(--brand-primary)' : 'transparent',
              color: filterType === 'movie' ? 'var(--brand-contrast)' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            Filmes
          </button>
          <button
            type="button"
            onClick={() => setFilterType('series')}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              backgroundColor: filterType === 'series' ? 'var(--brand-primary)' : 'transparent',
              color: filterType === 'series' ? 'var(--brand-contrast)' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            Séries
          </button>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <MediaGrid items={filteredItems} />
      ) : (
        <EmptyState
          icon={<Bookmark size={32} />}
          title="Nenhum item salvo nesta categoria"
          description="Navegue pelo catálogo e adicione títulos à sua lista para encontrá-los facilmente."
        />
      )}
    </div>
  );
};
