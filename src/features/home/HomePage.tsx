import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import { HeroBanner } from '@/components/banners/HeroBanner';
import { MediaRow } from '@/components/sections/MediaRow';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { PageLoading } from '@/components/feedback/PageLoading';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { OfflineState } from '@/components/feedback/OfflineState';
import { useAsyncViewState } from '@/hooks/useAsyncViewState';
import type { AsyncViewStatus } from '@/hooks/useAsyncViewState';
import { CINEFOXY_CATEGORIES } from '@/types/category';
import { ROUTES } from '@/app/config/constants';
import type { MediaItem } from '@/types/media';
import styles from './HomePage.module.css';

const DEMO_TRENDING: MediaItem[] = [
  { id: 'tr-1', title: 'O Enigma do Horizonte Laranja', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 8.4, genres: ['Ficção Científica'] },
  { id: 'tr-2', title: 'Velocidade e Sombras', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 7.8, genres: ['Ação'] },
  { id: 'tr-3', title: 'Aliança Silenciosa', overview: '', posterUrl: '', type: 'series', releaseYear: 2023, rating: 8.9, genres: ['Suspense'] },
  { id: 'tr-4', title: 'Planeta Invisível', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 8.1, genres: ['Aventura'] },
  { id: 'tr-5', title: 'O Último Guardião do Tempo', overview: '', posterUrl: '', type: 'series', releaseYear: 2024, rating: 8.6, genres: ['Fantasia'] },
  { id: 'tr-6', title: 'Herança Perdida', overview: '', posterUrl: '', type: 'movie', releaseYear: 2023, rating: 7.9, genres: ['Drama'] }
];

const DEMO_RECENT_RELEASES: MediaItem[] = [
  { id: 'rec-1', title: 'Além da Colina das Sombras', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 8.3, genres: ['Animação'] },
  { id: 'rec-2', title: 'Chamas no Ártico', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 7.5, genres: ['Ação'] },
  { id: 'rec-3', title: 'Labirinto Digital', overview: '', posterUrl: '', type: 'series', releaseYear: 2024, rating: 8.7, genres: ['Ficção Científica'] },
  { id: 'rec-4', title: 'Sob as Luzes de Lisboa', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 8.0, genres: ['Romance'] },
  { id: 'rec-5', title: 'Fronteira Oculta', overview: '', posterUrl: '', type: 'series', releaseYear: 2024, rating: 8.2, genres: ['Mistério'] }
];

const DEMO_TOP_RATED: MediaItem[] = [
  { id: 'top-1', title: 'Crônicas do Cinema Silencioso', overview: '', posterUrl: '', type: 'movie', releaseYear: 2023, rating: 9.2, genres: ['Documentário'] },
  { id: 'top-2', title: 'O Peso da Verdade', overview: '', posterUrl: '', type: 'series', releaseYear: 2022, rating: 9.0, genres: ['Drama'] },
  { id: 'top-3', title: 'Falcões da Noite', overview: '', posterUrl: '', type: 'movie', releaseYear: 2023, rating: 8.8, genres: ['Crime'] },
  { id: 'top-4', title: 'O Mago de Ferro', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 8.7, genres: ['Fantasia'] },
  { id: 'top-5', title: 'Tempo e Memória', overview: '', posterUrl: '', type: 'series', releaseYear: 2023, rating: 8.9, genres: ['Mistério'] }
];

const DEMO_HIDDEN_GEMS: MediaItem[] = [
  { id: 'gem-1', title: 'O Violinista da Estação', overview: '', posterUrl: '', type: 'movie', releaseYear: 2023, rating: 8.1, genres: ['Drama'] },
  { id: 'gem-2', title: 'Sombras do Vale Azul', overview: '', posterUrl: '', type: 'movie', releaseYear: 2024, rating: 7.9, genres: ['Suspense'] },
  { id: 'gem-3', title: 'Caminhos do Vento', overview: '', posterUrl: '', type: 'series', releaseYear: 2023, rating: 8.0, genres: ['Aventura'] },
  { id: 'gem-4', title: 'Código Esquecido', overview: '', posterUrl: '', type: 'movie', releaseYear: 2022, rating: 7.8, genres: ['Ficção Científica'] },
  { id: 'gem-5', title: 'Retrato em Tons Claros', overview: '', posterUrl: '', type: 'movie', releaseYear: 2023, rating: 8.2, genres: ['Drama'] }
];

export interface HomePageProps {
  forcedStatus?: AsyncViewStatus;
}

export const HomePage: React.FC<HomePageProps> = ({ forcedStatus }) => {
  const { status, error, retry } = useAsyncViewState({
    hasData: DEMO_TRENDING.length > 0,
    forcedStatus
  });

  if (status === 'loading') {
    return (
      <div className="pageTransition">
        <PageLoading variant="home" />
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
          title="Nenhum título em destaque no momento"
          description="Explore as seções de filmes, séries ou categorias para descobrir produções disponíveis."
        />
      </div>
    );
  }

  const featuredCategories = CINEFOXY_CATEGORIES.slice(0, 4);

  return (
    <div className="pageTransition fadeIn">
      {/* Hero Banner Cinematográfico com Animated Poster Wall */}
      <HeroBanner />

      {/* Trilhos das Coleções Principais */}
      <MediaRow
        title="🔥 Em Alta no CineFoxy"
        description="Produções em evidência com base nos indicadores de tendências da semana"
        items={DEMO_TRENDING}
      />

      <MediaRow
        title="✨ Lançamentos Recentes"
        description="Novidades cinematográficas recém-chegadas ao catálogo"
        items={DEMO_RECENT_RELEASES}
      />

      <MediaRow
        title="🏆 Mais Bem Avaliados"
        description="Obras com alta aprovação e volume consistente de avaliações"
        items={DEMO_TOP_RATED}
      />

      <MediaRow
        title="💎 Joias Escondidas"
        description="Produções de qualidade destacada fora do circuito massivo"
        items={DEMO_HIDDEN_GEMS}
      />

      {/* Categorias em Destaque */}
      <section className={styles.categoriesSection} aria-label="Categorias em destaque">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Categorias em Destaque</h2>
          <Link to={ROUTES.CATEGORIES} className={styles.seeAllLink}>
            Ver todas
          </Link>
        </div>
        <div className={styles.categoriesGrid}>
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
};
